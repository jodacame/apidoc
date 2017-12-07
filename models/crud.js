'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/apidoc";



var save = function(target,data,callback)
{

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;

    db.collection(target).insertOne(data, function(err, result) {
      if (err) throw err;
      db.close();
      callback(err,result);
    });
  });
}

var update = function(target,filter,data,callback)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(target).updateOne(filter, data, function(err, result) {
      if (err) throw err;
      db.close();
      callback(err,result);
    });
  });
}

var find = function(target,filter,callback)
{

}

var findOne = function(target,filter,callback)
{

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection(target).findOne(filter, function(err, result) {
      if (err) throw err;
      db.close();
      callback(err,result);
    });
  });

}

module.exports = {
  save,
  find,
  findOne
}
