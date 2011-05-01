#analytics stuff
_gaq = [['_setAccount','UA-18606719-1'],['_trackPageview']]
d = window.document
l = d.location
scripts = [
  'google-analytics.com/ga.js',
  'ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js',
  l.host + '/js/site.js'
]

getScript = (src)->
  s = d.createElement 'script'
  s.async = true
  s.src = if 'http:' == l.protocol then 'http://' + src else 'https://' + src
  e = d.getElementsByTagName('script')[0]
  e.parentNode.insertBefore(s,e)


getScript(script) for script in scripts