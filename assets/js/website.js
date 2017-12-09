
var login = function(res,err){
  if(res.success){
    app.dialog.close();
    window.location.href = res.redirect;
  }
  app.toast(res.message.type,res.message.text);
}

var register = function(res,err){
  if(res.success){
    app.dialog.close();
  }
  
  app.toast(res.message.type,res.message.text)
  /* TODO: Auto-Login */
}
