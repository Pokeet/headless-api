FROM node

ENV APP_NAME headless-api
ENV APP_DIR /var/www/${APP_NAME}

RUN mkdir /var/www
RUN mkdir ${APP_DIR}

WORKDIR ${APP_DIR}

ADD package.json package.json
ADD nodemon.json nodemon.json

RUN npm install -g nodemon

RUN npm install

EXPOSE 3000