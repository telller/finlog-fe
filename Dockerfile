###################
# BUILD FOR PRODUCTION
###################

FROM node:22-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

###################
# PRODUCTION
###################

FROM node:22-alpine AS prod

EXPOSE 5173

CMD [ "serve", "-s", "dist" ]