'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const website   = require("./website.js")

const app = express();



app.enable('trust proxy');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(compression())

app.use(express.static('assets'))

/* Website Routes */
app.get("/",website.home);
app.get("/panel",website.panel);


module.exports = app;
