FROM node:16-alpine

WORKDIR /app

COPY react-frontend/package.json react-frontend/package-lock.json ./

RUN npm install

COPY react-frontend ./

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

EXPOSE 3000