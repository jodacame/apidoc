'use strict';
const crud = require("../models/crud");
var login = function(req,res,next){
  crud.findOne("account",{email:req.body.email},function(err,result){
    if(result)
    {
      res.status(200).json({success:true,response:req.body.email});
    }else {
      res.status(404).json({success:false,'error': "Email or password don't found"});
    }
  });
}

module.exports = {
  login
}
