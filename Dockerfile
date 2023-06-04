# Base stage
FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]
