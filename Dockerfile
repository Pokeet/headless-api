FROM node:10.12.0

ENV APP_NAME headless-api
ENV APP_DIR /usr/src/${APP_NAME}
ENV PORT 3000

ENV MONGO_USER_NAME api
ENV MONGO_PASSWORD password
ENV MONGO_DB_NAME headless-api
ENV MONGO_HOST mongo

ENV API_SECRET defaultSecretToChange
ENV API_VERSION 1

WORKDIR ${APP_DIR}

COPY package*.json ./

RUN apt-get update && apt-get -y install netcat && apt-get clean

RUN npm install -g nodemon --quiet
RUN npm install --quiet

COPY . .

ENTRYPOINT ["./docker-entrypoint.sh"]
RUN chmod o+x ./docker-entrypoint.sh

EXPOSE ${PORT}