FROM node:16.3.0-alpine3.11

ENV NODE_ENV = production

WORKDIR usr/src/app

COPY package.json /usr/src/app/package.json

COPY index.js .

RUN npm install --production

CMD ["npm","start"]