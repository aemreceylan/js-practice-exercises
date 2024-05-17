FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY server.js .

EXPOSE 8080

ENV KEEP_SERVER_RUNNING true

CMD ["node" , "server.js"]
