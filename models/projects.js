'use strict';

const crud = require('./crud.js');

const api  = {}
var get = function(filter,callback)
{
  crud.find("projects",filter,function(err,result){
      callback(err,result);
  });
}
api.get = function(filter,callback)
{
  crud.find("api",filter,function(err,result){
      callback(err,result);
  });
}



module.exports = {
  get,
  api
}
