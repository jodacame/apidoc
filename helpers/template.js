'user strict';

const path        = require('path');
const fs          = require('fs');
const Handlebars  = require('handlebars');
const crypto      = require('crypto')

/*
 * Compile handlebars template helper
 * @param {String} template Path with handlebars template
 * @param {Object} context data for template
 * @param {Function} callback (html,error)
 * @return html
*/

var compile = function(template,context,callback){

  context.setting = _settings;
  fs.readFile(template, function (err, data) {
          if(!err)
          {
            var source    = data.toString();
            var template  = Handlebars.compile(source);
            var html      = template(context);
            callback(html,false);
          }
          else {
            console.log(err);
            callback(false,err);
          }
    });
}


Handlebars.registerHelper('gravatar', (context, options) => {
  let email = context;
  let size = (typeof (options.hash.size) === 'undefined') ? 32 : options.hash.size;
  let hash = crypto.createHash('md5').update(email).digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?s=${size}`;
});

module.exports = {
  compile
}
