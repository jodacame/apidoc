var app = {};
app.temlates = [];
app.dialog = {};

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
  return false;
}
app.ajax = function (type,url,data,callback,format)
{
  var xhr = new XMLHttpRequest();
  console.log(type,url);
  xhr.open(type, url);
  if(type=='POST')
  {
    if(format.toLowerCase() != 'html')
      xhr.setRequestHeader("Content-type", "application/json");
    if( typeof data == 'object')
    {
      data = JSON.stringify(data);
    }
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

app.init();
