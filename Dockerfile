FROM node:10.12.0

ENV APP_NAME headless-api
ENV APP_DIR /usr/src/${APP_NAME}
ENV PORT 3000

ENV MONGO_USER_NAME api
ENV MONGO_PASSWORD password
ENV MONGO_DB_NAME headless-api
ENV MONGO_HOST mongo

WORKDIR ${APP_DIR}

COPY package*.json ./

RUN npm install -g nodemon --quiet
RUN npm install --quiet

COPY . .

EXPOSE ${PORT}