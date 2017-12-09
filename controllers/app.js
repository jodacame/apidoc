'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const website   = require("./website.js")
const account   = require("./account.js")
const session     = require('express-session')

const app = express();



app.enable('trust proxy');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({
  secret: '96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e',
  cookie: {
    secure: false ,
    maxAge: 60000 * 1440 * 30 // 30 Days
  },
  resave: true,
  saveUninitialized: true
}))


app.use(compression())

app.use(express.static('assets'))

/* Website Routes */
app.get("/",website.home);
app.get("/panel",website.panel);

/* Account */
app.post("/account/login",account.login);
app.post("/account/register",account.register);


module.exports = app;
