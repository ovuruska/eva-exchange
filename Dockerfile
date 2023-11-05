FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

COPY .env.docker .env
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]
