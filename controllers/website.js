'use strict';

const session     = require('express-session')
const template =  require("../helpers/template.js")

var home = function(req,res,next)
{

  if(req.session.logged)
  {
    res.redirect('/account/panel');
    return false;
  }


  template.compile('./templates/home.html',{},function(html,err){
    let context = {page:html, title: 'APIDoc | Free RESTful API Documentation Tools',description:'Welcome to home page',section:"home bg-white"}
    template.compile('./templates/template.html',context,function(html,err){
        res.status(200).send(html);
    });
  });
}


var panel = function(req,res,next)
{
  template.compile('./templates/panel/dashboard.html',{user:req.session.user},function(html,err){
    let context = {page:html, title: 'Panel',logged:true,user:req.session.user,description:'Panel | ApiDoc',section:"panel"}
    template.compile('./templates/template.html',context,function(html,err){
        res.status(200).send(html);
    });
  });
}

module.exports = {
  home,
  panel

}
