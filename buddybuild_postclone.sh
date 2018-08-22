#!/usr/bin/env bash

n 8.9.4

echo -n "----> npm Version: "
npm -v

echo -n "----> Node Version: "
node --version

npm uninstall -g cordova ionic gulp
npm install -g cordova@8.0.0 ionic@3.20.0 gulp@2.0.0

echo -n "----> Cordova version: "
cordova --version

echo -n "----> Processing: npm install..."
npm install

echo -n "----> Processing: ionic build..."
npm run build

echo -n "----> Processing: Adding iOS Platform..."
ionic platform add ios

ionic build