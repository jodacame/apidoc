var app = {};

app.toggleClass= function(el, _class) {
  //Check if the element exists,
  //& if it has the class we want to toggle
  if (el && el.className && el.className.indexOf(_class) >= 0) {
    //Element has the class, so lets remove it...
    //Find the class to be removed (including any white space around it)
    var pattern = new RegExp('\\s*' + _class + '\\s*');
    //Replace that search with white space, therefore removing the class
    el.className = el.className.replace(pattern, ' ');
  
  }
  else if (el){
    //Element doesn't have the class, so lets add it...
    el.className = el.className + ' ' + _class;
  }
  else {
    //Our element doesn't exist
    console.log("Element not found");
  }
}
