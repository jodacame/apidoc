'use strict';
const crud        = require("../models/crud");
const functions   = require("../helpers/functions");

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

module.exports = {
  createProject
}
