#!/bin/bash

mongod --auth
sleep 3
pm2 start processes.json --no-daemon