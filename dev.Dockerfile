FROM node:22-alpine AS dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "vite build --mode $NODE_ENV && serve -s dist -l 5173"]
