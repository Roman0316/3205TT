FROM node:18-alpine

ARG APP_DIR=/var/www/test-task/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "start"]


