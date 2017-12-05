'use strict';


const template =  require("../helpers/template.js")

var home = function(req,res,next)
{
  let context = {message:'Hello Home!'}
  template.compile('./templates/home.html',context,function(html,err){
    let context = {page:html, title: 'APIDoc | Free RESTful API Documentation Tools',description:'Welcome to home page',section:"home bg-white"}
    template.compile('./templates/template.html',context,function(html,err){
        res.status(200).send(html);
    });
  });
}
var panel = function(req,res,next)
{
  let context = {message:'Hello Home!'}
  template.compile('./templates/home.html',context,function(html,err){
    let context = {page:html, title: 'Home',description:'Welcome to home page',section:"panel"}
    template.compile('./templates/template.html',context,function(html,err){
        res.status(200).send(html);
    });
  });
}

module.exports = {
  home,
  panel
}
