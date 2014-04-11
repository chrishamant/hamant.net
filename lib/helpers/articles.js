var each = require('async').each;
var _ = require('lodash');
var moment = require('moment');

module.exports = articles;

function articles(files,ms,done){
  var to_operate = Object.keys(files).filter(function(filename){
    var f = filename.split('.');
    return f.pop() == 'md';
  });

  each(to_operate,convert,done);

  function convert(f,done){
    var file = files[f];

    var permalink = [];
    permalink.push(file.date.format('YYYY/MM/DD'));
    permalink.push(file.slug);

    //add permalink to data
    file.permalink = permalink.join('/');

    //stuff contents into template
    var template = "extends /_layout/post\nblock post_content\n  :markdown\n";
    var contents = file.contents.toString().split("\n").map(function(s){
      return '    ' + s;
    }).join('\n');

    file.contents = new Buffer(template + contents);

    //copy to /YYYY/MM/DD/:slug/index.jade
    var permed = _.clone(file);
    permed.collection = 'articles';
    files[file.permalink + "/index.jade"] = permed;

    process.nextTick(done);

  }
}
