var build = require('../lib/build');

build({
  base : __dirname + '/..',
  site : 'site',
  dest : '_build'

}, function(err,files){
  if(err){
    console.dir(err);
    process.exit(1);
  }else{
    console.log("built!");
    process.exit(0);
  }
});
