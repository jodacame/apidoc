'use strict';
const crud        = require("../models/crud");
const template        = require("../helpers/template");
const functions   = require("../helpers/functions");
const session     = require('express-session')

/*
 * @param {String:POST} email
 * @param {String:POST} password
 */

var login = function(req,res,next){
  var email       = req.body.email;
  var password    = functions.sha1(req.body.password);

  crud.findOne("account",{email:email,password:password},function(err,result){
    if(result)
    {
      req.session.logged  = true;
      req.session.user    = result;
      delete result._id;
      delete result.password;
      res.status(404).json({success:true,redirect:'/account/panel','message':{ type:'success',text: "You have successfully login, Please wait..."}});
    }else {
      res.status(404).json({success:false,'message':{ type:'error',text: "Email and password don't match"}});
    }
  });
}

var isLogged = function(req,res,next){
  if(!req.session.logged)
  {
    res.redirect('/');
    res.end();
    return false;
  }
  next()
}

/*
 * Register method
 * @param {String:POST} email
 * @param {String:POST} password
 * @param {String:POST} passwordr
 */
var register = function(req,res,next){

  var email       = req.body.email;
  var password    = req.body.password;
  var passwordr   = req.body.passwordr;
  if(password == passwordr)
  {

    crud.createUnique("account","email"); /* Optional */

    crud.findOne("account",{email:req.body.email},function(err,result){
      if(!result)
      {

          var save = {};
          save.email      = email;
          save.password   = functions.sha1(password);
          save.registered = new Date();
          save.verified   = false;
          save.verifyCode = functions.generateString(6);
          save.ipRegistred= req.ip;

          crud.save("account",save,function(err,result){

              let message        = '<strong>hello!</strong><br><br>'+save.email+'<br><br><strong>Welcome to '+_settings.website.title+"</strong><br><br>Your verification code is:<br><br><h2 style='font-family: courier'>"+save.verifyCode+"</h2><br>";
              template.compile('./templates/emails/template.html',{message:message},function(html,err){
                  let email     = {};
                  console.log(html);
                  email.html    = html;
                  email.to      = save.email;
                  email.subject = 'Your verirication code';
                  email.text    = '';
                  if(err)
                    console.log(err);
                  else
                    functions.mail(email);
                  res.status(200).json({success:true,'message':{type:'success',text: "You have successfully registered"}});
              });

          });
      }else {
        res.status(403).json({success:false,'message':{ type:'error',text: "Email already registered"}});
      }
    });
  }
  else
  {
    res.status(400).json({success:false,'message': {type:'warning',text:"Password don't match"}});
  }
}

module.exports = {
  login,
  register,
  isLogged
}
