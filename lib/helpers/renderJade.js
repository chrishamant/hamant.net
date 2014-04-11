var jade = require('jade');
var each = require('async').each;

module.exports = renderJade;

function renderJade(files,ms,done){
  var to_operate = Object.keys(files).filter(function(filename){
    var f = filename.split('.');
    return f.pop() == 'jade';
  });
  each(to_operate,convert,done);
  function convert(f,done){

    //TODO get path from env or something?
    var options = {
       filename : __dirname + "/../../site/" + f,
       basedir : __dirname + "/../../site/",
       pretty : true,
       debug : false
    };

    var file_fn = jade.compile(files[f].contents,options);
    var data = {
      page : files[f],
      files : files,
      site : ms.metadata()
    };
    var text = file_fn(data);
    var oldfile = files[f];

    oldfile.contents = new Buffer(text);

    delete files[f];

    var newname = f.split('.');
    newname.pop();
    newname.push('html');

    files[newname.join('.')] = oldfile;
    process.nextTick(done);
  }
}
