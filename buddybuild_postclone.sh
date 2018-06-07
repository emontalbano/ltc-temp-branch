#!/usr/bin/env bash

n 6.10.1

echo -n "----> npm Version: "
npm -v

echo -n "----> Node Version: "
node --version

npm cache clean
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

echo -n "----> Processing: Adding Android Platform (6.x)..."
ionic platform add android

ionic build