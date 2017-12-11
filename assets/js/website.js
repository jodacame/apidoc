
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
    window.location.href = res.redirect;
  }
  app.toast(res.message.type,res.message.text)

}

var recovery = function(res,err)
{
  if(res.success){
    app.dialog.open('login-form');
  }
  app.toast(res.message.type,res.message.text)
}

var verify = function(res,err,form)
{
  form.code.value = '';
  form.code.focus();
  if(res.success && res.redirect){
    window.location.href = res.redirect;
  }
  app.toast(res.message.type,res.message.text);

}
