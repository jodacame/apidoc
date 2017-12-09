var app = {};
app.temlates = [];
app.dialog = {};
app.cache   = [];
var $ = app; // Do you like jQuery alias?  :) Ok... But remember .. this it's not jQuery :p

app.toggleClass= function(el, _class) {

  if (el && el.className && el.className.indexOf(_class) >= 0) {
    var pattern = new RegExp('\\s*' + _class + '\\s*');
    el.className = el.className.replace(pattern, ' ');
  }
  else if (el){
    el.className = el.className + ' ' + _class;
  }
  else {
    console.log("Element not found");
  }
}

app.addClass = function(elements, _class) {

  // if there are no elements, we're done
  if (!elements) { return; }

  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }

  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {

    // if class is not already found
    if ( (' '+elements[i].className+' ').indexOf(' '+_class+' ') < 0 ) {

      // add class
      elements[i].className += ' ' + _class;
    }
  }
}
app.removeClass = function(elements, _class) {

  // if there are no elements, we're done
  if (!elements) { return; }

  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }

  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }

  // create pattern to find class name
  var reg = new RegExp('(^| )'+_class+'($| )','g');

  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].className = elements[i].className.replace(reg,' ');
  }
}

app.submit = function(form,callback){
  var data = app.serialize(form);
  app.ajax('POST',form.target,data,function(res,err){
    window[callback](res,err);
  });
  return false;
}



app.sendForm = function(form,callback)
{
    var formData = new FormData(form)
    var data = {};
      formData.forEach(function(value, key){
          data[key] = value;
      });
    var request = new XMLHttpRequest()


    request.onreadystatechange = function(){
      var DONE = 4;
      if (request.readyState === DONE)
        window[callback](JSON.parse(request.responseText),request)
    }
    request.open(form.method, form.action,true)
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(data));

    return false;
}
// End Login
app.ajax = function (type,url,data,callback,format,enctype)
{
  var xhr = new XMLHttpRequest();
  console.log(type,url);
  xhr.open(type, url);
  if(!format)
    format = 'json';
  switch (type.toUpperCase()) {

    case 'POST':
        if(format.toLowerCase() != 'html')
          xhr.setRequestHeader("Content-type", "application/json");
        if( typeof data == 'object')
        {
          data = JSON.stringify(data);
        }
      break;

    case 'GET':
        if( typeof data == 'object' && data)
        {
          var params = "";
          for (var key in data) {
              if (str != "") {
                  str += "&";
              }
              params += params + "=" + obj[key];
            }
            url = url+"?"+params;
        }
        data = null;
      break;

    default:
      console.warn("[AJAX] Type: "+type+ " Not valid");
      return false;
    }



  //xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
  //xhr.withCredentials = false;
  xhr.send(data);
  xhr.onreadystatechange = function () {
    var DONE = 4;
    if (xhr.readyState === DONE) {
        if(!xhr.responseText)
            callback(null,xhr);
        else
        {
          if(format.toLowerCase() == 'html')
            callback((xhr.responseText),xhr);
          else {
            callback(JSON.parse(xhr.responseText),xhr);
          }
        }

    }
  }
}

app.serialize = function(form)
{


  var body = Object.create(null)

  Array.prototype.slice.call(form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)')).forEach(function (el)
  {
    var key = el.name;

    // if an element has no name, it wouldn't be sent to the server
    if (!key) return

    if (['file', 'reset', 'submit', 'button'].indexOf(el.type) > -1) return

    if (['checkbox', 'radio'].indexOf(el.type) > -1 && !el.checked) return

    if (/\[\]$/.test(key)) {
      key = key.slice(0,-2);

      // if using array notation, go ahead and put the first value into an array.
      if (body[key] === undefined) {
        body[key] = [];
      }
    }

    if (body[key] === undefined) {
      body[key] = el.value;
    } else if (Object.prototype.toString.call(body[key]) === '[object Array]') {
      body[key].push(el.value);
    } else {
      body[key] = [body[key], el.value];
    }
  });
  return body

}



app.dialog.close = function(noAnimation)
{
  var dialog = document.querySelector(".modal");
  if(!dialog)
    return false;
  if(!noAnimation)
  {
    app.removeClass(dialog.querySelector(".modal-dialog"),'bounceIn');
    app.addClass(dialog.querySelector(".modal-dialog"),'bounceOut');
    setTimeout(function(){
      dialog.remove();
    },500);
  }
  else{
    dialog.remove();
  }


}

app.dialog.open = function(dialog)
{
  if(!app.temlates[dialog])
  {
    app.ajax('GET',"/templates/"+dialog+".html",{},function(html,err){
      if(html)
      {
        app.temlates[dialog] = html;
        app.dialog.open(dialog);
      }else {
        console.error(err);
      }
    },'HTML');
  }
  else {
    // Close others dialogs first
    app.dialog.close(true);

    var idDialog  = 'dialog-'+dialog;
    var _elm       = document.createElement('div');
    _elm.setAttribute("id",idDialog);
    _elm.classList.add('modal');
    _elm.innerHTML = app.temlates[dialog];
    var closeButtons = _elm.querySelectorAll("button.close");
    for (i = 0; i < closeButtons.length; i++) {
      closeButtons[i].onclick = function(){
        app.dialog.close();
      }
    }
    _elm.onclick = function(event){
      if(event.target == _elm)
        app.dialog.close();
    }


    document.body.appendChild(_elm);
    app.addClass(_elm,'show');
  }
}

app.init = function(){
  app.events();
}

app.events = function(){
  /* Close all dialogs when press ESC key */
  window.addEventListener('keydown', function(e){
    if(e.key=='Escape'||e.key=='Esc'||e.keyCode==27){
        e.preventDefault();
        app.dialog.close();
        return false;
    }
  }, true);
}
/* success,info,warning,error */
app.toast = function(type,message)
{
  if (!document.getElementById('toastNoty')) {
    var _elm       = document.createElement('div');
    _elm.setAttribute("id",'toastNoty');
    document.body.appendChild(_elm);
    app.cache['toastNoty'] = _elm;
  }


    var _noty       = document.createElement('div');
    _noty.classList.add('animated');
    _noty.classList.add('bounceIn');
    _noty.classList.add(type);
    _noty.innerHTML = message;


    _noty.onclick = function(){
      this.remove();
    }
    setTimeout(function(){
      if(_noty)
      {
        _noty.classList.remove('bounceIn');
        _noty.classList.add('bounceOut');
      }
    },4000);

    setTimeout(function(){
      if(_noty)
      {
        _noty.remove();
      }
    },5000);





    app.cache['toastNoty'].appendChild(_noty);

}

app.sendRecoveryCode = function(form)
{

  var form = document.querySelector("#frm-recovery");
  if (!form.email.checkValidity()) {
      form.email.focus();
       app.toast("warning",form.email.validationMessage);
       return false;
  }
  /* TODO: Send email with recovery code */
  form.email.readOnly = true;
  var email = form.email.value;
  form.password.disabled = false;
  form.passwordr.disabled = false;
  form.recovery.disabled = false;
  form.querySelector("button[type='submit']").disabled = false;
}
app.init();
