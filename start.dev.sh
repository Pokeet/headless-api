#!/bin/bash

mongod --auth
sleep 3
echo "Ready to dev :)"
node ./node_modules/.bin/nodemon ./src/main.js --exec ./node_modules/.bin/babel-node