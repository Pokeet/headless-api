#Dockerfile

FROM debian:stretch-slim

ENV appName headless-api
ENV appDir /var/www/${appName}
ENV NVM_DIR /usr/local/nvm

ENV NODE_VERSION 8.5.0

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update

RUN apt-get install -y -q --no-install-recommends \
    apt-transport-https \
    build-essential \
    ca-certificates \
    curl \
    g++ \
    git \
    make \
    sudo \
    wget \
    && apt-get -y autoclean

# Install nvm with node and npm

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash \
    && source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# set up path
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# set the working dir
RUN mkdir -p ${appDir}
WORKDIR ${appDir}

# Add our package.json and install
ADD package.json ./
RUN npm i --production

# Install pm2 globally
RUN npm i -g pm2

# Add application files
ADD . ${appDir}

# Expose the port
EXPOSE 3597

CMD ["pm2", "start", "processes.json", "--no-daemon"]