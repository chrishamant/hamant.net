(function() {
  var init;
  init = function() {
    return alert("Hello World");
  };
  if (jQuery) {
    init();
  } else {
    window.setTimeout(ready, 0);
  }
}).call(this);
