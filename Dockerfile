FROM node:12.19.0-alpine3.10

RUN apk update && apk add bash

WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]