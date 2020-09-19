#!/bin/bash

if [ $1 == "production" ] ; then
  yarn start
else
  npm install -g nodemon && yarn dev
fi