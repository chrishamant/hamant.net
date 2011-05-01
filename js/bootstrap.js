(function() {
  var d, getScript, l, script, scripts, _gaq, _i, _len;
  _gaq = [['_setAccount', 'UA-18606719-1'], ['_trackPageview']];
  d = window.document;
  l = d.location;
  scripts = ['google-analytics.com/ga.js', 'ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js', l.host + '/js/site.js'];
  getScript = function(src) {
    var e, s;
    s = d.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = 'http:' === d.location.protocol ? 'http://' + src : 'https://' + src;
    e = (d.getElementsByTagName('script')[0]);
    return e.parentNode.insertBefore(s, e);
  };
  for (_i = 0, _len = scripts.length; _i < _len; _i++) {
    script = scripts[_i];
    getScript(script);
  }
}).call(this);
