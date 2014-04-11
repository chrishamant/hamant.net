var each = require('async').each;

function excludePattern(p){
  var pattern = p;
  return function(files,ms,done){
    each(Object.keys(files),function(f,cb){
      if(pattern.test(f)){
        delete files[f];
      }
      cb();
    },done);
  }
}

module.exports = excludePattern;
