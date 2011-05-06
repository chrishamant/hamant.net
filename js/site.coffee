init = ()->
  alert("Hello World")
  
  
if jQuery then init() else window.setTimeout(ready,0)

#http://docs.disqus.com/help/60/ - can I hack other variables so I don't have to pollute global with so much crap?
#disqus_config ()->
#  @callbacks.onNewComment = [(comment)->alert(alert(comment))]