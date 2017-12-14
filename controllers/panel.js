'use strict';
const crud        = require("../models/crud");
const functions   = require("../helpers/functions");
const ObjectID    = require('mongodb').ObjectID;
const projects    = require("../models/projects");

var createProject    = function(req,res,next)
{
  var description       = req.body.description;
  var name              = req.body.name;
  var isPublic          = false;
  if(req.body.public)
    isPublic            = true;

  var save = {};
  save.name           = name;
  save.description    = description;
  save.isPublic       = isPublic;
  save.owner          = req.session.user.email;
  save.created        = new Date();
  crud.save("projects",save,function(err,result){
    res.status(200).json({success:true,redirect:"/account/panel/project/"+result.insertedId,'message':{ type:'success',text: "Project created successfully"}});

  });
}

var createApi = function(req,res,next)
{

      var description   =  req.body.description;
      var name          =  req.body.name;
      var version       =  req.body.version;
      if(ObjectID.isValid(req.params.idProject))
        var idProject = new ObjectID(req.params.idProject)
      else
        var idProject = false;

      if(idProject)
      {
        projects.get({_id:idProject,owner:req.session.user.email},function(err,result){
          if(result[0])
          {
              let save = {};
              save.idProject    = idProject;
              save.name         = name;
              save.version      = version;
              save.description  = description;
              crud.save("api",save,function(err,result){
                  res.status(200).json({redirect:"/account/panel/project/"+req.params.idProject,success:true,'message':{ type:'success',text: "API created successfully"}});
              });

          }else {
            res.status(403).json({success:true,'message':{ type:'error',text: "Project not found"}});
          }
        });
      }else{
        res.status(403).json({success:true,'message':{ type:'error',text: "Project not found"}});
      }

}
module.exports = {
  createProject,
  createApi
}
