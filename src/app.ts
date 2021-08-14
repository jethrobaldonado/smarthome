import 'reflect-metadata';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { ProcessConfigLoader } from './config/env';
import { DbConnection } from './db/utils/connection.db';
import { ContainerConfigLoader } from './config/container';

//Controllers Import
import "./controllers/home.controller";

ProcessConfigLoader.load('.env');

const container = ContainerConfigLoader.load();

DbConnection.initConnection().then((mongod: any) => {
  // DbConnection.setAutoReconnect();

  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
  });

  const serverInstance = server.build();
  serverInstance.listen(process.env.PORT);
  console.log(`Server started on Port ${process.env.PORT}`);
});