###################
# BUILD FOR PRODUCTION
###################

FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

###################
# PRODUCTION
###################

FROM node:22-alpine AS prod

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
