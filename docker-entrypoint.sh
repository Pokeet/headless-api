#!/bin/bash
while ! nc -z mongo 27017
do
  echo waiting for mongo to startup
  sleep 1
done
echo mongo ready!

if [$NODE_ENV = "development"]
then
  npm run startDev
else
  npm start
fi