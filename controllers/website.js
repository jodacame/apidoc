'use strict';

const session     = require('express-session')
const template =  require("../helpers/template.js")
const projects    = require("../models/projects");
const ObjectID = require('mongodb').ObjectID;

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
  projects.get({owner:req.session.user.email},function(err,result){

    template.compile('./templates/panel/dashboard.html',{user:req.session.user,projects:result},function(html,err){
      let context = {page:html, title: 'Panel',projects:result,logged:true,user:req.session.user,description:'Panel | ApiDoc',section:"panel"}
      template.compile('./templates/template.html',context,function(html,err){
          res.status(200).send(html);
      });
    });
  });

}

var project = function(req,res,next)
{
  if(ObjectID.isValid(req.params.idProject))
    var idProject = new ObjectID(req.params.idProject)
  else
    var idProject = '1';
  projects.get({owner:req.session.user.email,_id:idProject},function(err,result){

    if(result[0])
    {
      result = result[0];
      template.compile('./templates/panel/project.html',{user:req.session.user,projects:result},function(html,err){
      projects.get({owner:req.session.user.email},function(err,result){
          let context = {page:html, title: 'Panel',projects:result,logged:true,user:req.session.user,description:'Panel | ApiDoc',section:"panel"}
          template.compile('./templates/template.html',context,function(html,err){
              res.status(200).send(html);
          });
        });
      });
    }
    else{
      res.status(404).send("Project not found");
    }
  });

}

module.exports = {
  home,
  panel,
  project

}
