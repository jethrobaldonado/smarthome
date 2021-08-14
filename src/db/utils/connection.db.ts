import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';

export class DbConnection {
  public static async initConnection() {
    process.env.DB_CONN_STR = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await DbConnection.connect(process.env.DB_CONN_STR);
  }

  public static async connect(connStr: string) {
    return mongoose
      .connect(connStr, { useNewUrlParser: true, useFindAndModify: false })
      .then(() => {
        console.log(`Successfully connected to ${connStr}`);
      })
      .catch((error) => {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  }

  // public static setAutoReconnect() {
  //   process.env.DB_CONN_STR = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  //   mongoose.connection.on('disconnected', () => DbConnection.connect(process.env.DB_CONN_STR));
  // }

  public static async disconnect() {
    await mongoose.connection.close();
  }
}
