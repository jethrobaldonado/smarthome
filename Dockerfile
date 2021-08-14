FROM alpine:latest
WORKDIR /app
RUN apk add npm nodejs
COPY dist ./build
COPY package.json .

RUN npm install

EXPOSE 1337

ENTRYPOINT [ "node", "build/app.js" ]