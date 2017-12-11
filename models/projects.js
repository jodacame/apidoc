'use strict';

const crud = require('./crud.js');

var get = function(filter,callback)
{
  crud.find("projects",filter,function(err,result){
      callback(err,result);
  });
}

module.exports = {
  get
}
