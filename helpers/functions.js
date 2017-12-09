'use strict'

const crypto = require('crypto')
const nodemailer = require('nodemailer')
const Handlebars = require('handlebars');
const fs = require('fs');

/*
 * Generate random string
 * @param {Integer} len
 * @return {String}
 */

function generateString(len) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if(!len)
    len = 100;
  for (var i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

/*
 * Generate SHA1 hash from string
 * @param {String} input
 * @return {String}
*/
var sha1 = function(input){
    return crypto.createHash('sha1').update(input).digest('hex')
}

/*
 * Generic function to send a email
 * @param {Object} email
 * @param {String} email.template path template html
 * @param {String} email.message
 * @param {String} email.from from "'name <email@domain.com>'"
 * @param {String} email.to
 * @param {String} email.subject
 * @param {String} email.text No HTML Message
 * @param {Function} callback (success,response)
*/
var mail = function(email,callback)
{

  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: website.email.host,
        port: website.email.port,
        authMethod: website.email.method,
        secure: false, // true for 465, false for other ports
        auth: {
            user: website.email.user,
            pass: website.email.password
        }
    });




    fs.readFile(email.template, function (err, data) {
      var source = data.toString();
      var template = Handlebars.compile(source);
      var context = {message: email.message};
      var html    = template(context);

      let mailOptions = {
          from: email.from, // sender address
          to: email.to, // list of receivers
          subject: email.subject, // Subject line
          text: email.text, // plain text body
          html: html // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
          let response,success;
          if (error) {
              response = error;
              success = false;
          }else {
            response = info;
            success = true;
          }
          if(callback)
            callback(success,response);
      });
    });

  });
}
module.exports = {
  generateString,
  sha1,
  mail
}
