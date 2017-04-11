#! /bin/bash

npm install
npm install -g bower && bower install
npm install -g nodemon && DEBUG=socketio-server nodemon socketio-server.js
