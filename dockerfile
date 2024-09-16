FROM node:21-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 300

CMD ["npm", "run", "start:dev"]