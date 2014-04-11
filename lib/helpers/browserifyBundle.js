var each = require('async').each;
var browserify = require('browserify');

module.exports = browserifyBundle;

function browserifyBundle(files,ms,done){
  var to_operate = Object.keys(files).filter(function(filename){
    var f = filename.split('.');
    return f.pop() == 'js';
  });

  each(to_operate,convert,done);

  function convert(f,done){
    var b = browserify();
    //TODO use streams to prevent double read from disk (must solve pathing issues)
    b.add(__dirname + "/../../site/" + f);

    //TODO toggle debug builds
    var opts = {debug:true};

    b.bundle(opts,function(err,js){
      if(err)console.dir(err);
      files[f].contents = new Buffer(js);
      process.nextTick(done);
    })

  }
}
