'user strict';

const path        = require('path');
const fs          = require('fs');
const Handlebars  = require('handlebars');

/*
 * @param template Path with handlebars template
 * @param context Object data for template
 * @param callback Function callback for return html
 * @return html
*/

var compile = function(template,context,callback){

  fs.readFile(template, function (err, data) {
          if(!err)
          {
            var source    = data.toString();
            var template  = Handlebars.compile(source);
            var html      = template(context);
            callback(html);
          }
          else {
            callback(false,err);
          }
    });
}

module.exports = {
  compile
}
