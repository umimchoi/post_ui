FROM node:12

RUN mkdir /usr/src/app

WORKDIR usr/src/app

COPY package.json /usr/src/app/package.json

COPY index.js .

RUN npm install

CMD ["npm","start"]