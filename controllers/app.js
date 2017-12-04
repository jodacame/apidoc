'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')

const app = express();


app.enable('trust proxy');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({     
  extended: true
}));

app.use(compression())

app.get("/",function(req,res,next){
  res.status(200).send("Hello World!");
});


module.exports = app;
