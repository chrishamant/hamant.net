#analytics stuff
@._gaq = [['_setAccount','UA-18606719-1'],['_trackPageview']]

#disqus variables
@.disqus_shortname = 'hamantdotnet'
#for article @.disqus_identifier = 'unique_dynamic_id_1234';
#for permalink @.disqus_url = 'http://example.com/permalink-to-page.html'
#disqus_title
#<div id="disqus_thread"></div>
#see http://docs.disqus.com/help/2/
#http://docs.disqus.com/help/58/
#http://docs.disqus.com/help/69/

d = window.document
l = d.location

scripts = [
  'google-analytics.com/ga.js',
  'ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js',
#blog comments  disqus_shortname + '.disqus.com/embed.js',
#article counts  disqus_shortname + '.disqus.com/count.js
#<a href="http://example.com/article1.html#disqus_thread" data-disqus-identifier="article_1_identifier">First article</a>
  l.host + '/js/site.js'
]

getScript = (src)->
  s = d.createElement 'script'
  s.async = true
  s.src = if 'http:' == l.protocol then 'http://' + src else 'https://' + src
  e = d.getElementsByTagName('script')[0]
  e.parentNode.insertBefore(s,e)


getScript(script) for script in scripts