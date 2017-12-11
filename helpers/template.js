'user strict';

const path        = require('path');
const fs          = require('fs');
const Handlebars  = require('handlebars');

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
            callback(false,err);
          }
    });
}

module.exports = {
  compile
}
