#!/bin/bash

if [ $1 == "production" ] ; then
  yarn build
else
  yarn start
fi