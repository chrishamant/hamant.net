w = window
h = head

#analytics stuff
w._gaq = [['_setAccount','UA-18606719-1'],['_trackPageview']]

#disqus variables
w.disqus_shortname = 'hamantdotnet'

scripts = [
  { ga : '//google-analytics.com/ga.js' }
  { pgcmts : '//hamantdotnet.disqus.com/embed.js' }
]
sitescripts = [
  '//ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js'
  { site : '/js/site.js' }
]

h.js.apply null, sitescripts
h.js.apply null, scripts

h.ready "site" , ()->
  w.init()

