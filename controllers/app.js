'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const website   = require("./website.js")
const panel     = require("./panel.js")
const account   = require("./account.js")
const session     = require('express-session')
const crud        = require("../models/crud");
const RedisStore = require('connect-redis')(session);


const app = express();


/* Global setting */
crud.findOne("settings",{},function(err,result){
  global._settings = result;
});

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
  store: new RedisStore(),
  resave: true,
  saveUninitialized: true
}))


app.use(compression())

app.use(express.static('assets'))

/* Website Routes */
app.get("/",website.home);


/* Account */
app.post("/account/login",account.login);
app.post("/account/register",account.register);
app.post("/account/sendRecoveryCode",account.sendRecoveryCode);
app.post("/account/recovery",account.recovery);
app.post("/account/verify",account.isLogged,account.verify);
app.get("/account/logout",account.logout);

/* Panel */
app.get("/account/panel",account.isLogged,website.panel);
app.post("/account/panel/project",account.isLogged,panel.createProject);
app.get("/account/panel/project/:idProject",account.isLogged,website.project);
app.get("/account/panel/project/:idProject/new",account.isLogged,website.newApi);


module.exports = app;
