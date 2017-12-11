'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/apidoc";

/*
 * @param {String} name collection
 * @param {Object} object to save
 * @param {Function} Callback (err,result)
 */
var save = function(target,data,callback)
{

  MongoClient.connect(url, function(err, db) {
    db.collection(target).insertOne(data, function(err, result) {
      if (err) throw err;
      db.close();
      callback(err,result);
    });
  });
}

/*
 * @param {String} name collection
 * @param {Object} filter
 * @param {Object} update date
 * @param {Function} Callback (err,result)
 */
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
  MongoClient.connect(url, function(err, db) {
    db.collection(target).findOne(filter, function(err, result) {
      db.close();
      callback(err,result);
    });
  });
}

/*
 * @param {String} name collection
 * @param {Object} filter
 * @param {Function} Callback (err,result)
 */

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

/*
 * @param {String} name collection
 * @param {Object} field name
 */
var createUnique = function(target,field){
  MongoClient.connect(url, function(err, db) {
    db.createIndex(target, field, {unique: true});
  });
}

module.exports = {
  save,
  find,
  findOne,
  createUnique
}
