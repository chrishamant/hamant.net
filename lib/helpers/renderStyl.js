var stylus = require('stylus');
var nib = require('nib');
var each = require('async').each;

module.exports = renderStyl;


function renderStyl(files,ms,done){
  var to_operate = Object.keys(files).filter(function(filename){
    var f = filename.split('.');
    return f.pop() == 'styl';
  });
  each(to_operate,convert,done);
  function convert(f,done){

    var styl = stylus(files[f].contents.toString())
      .use(nib())
      .set('filename',__dirname + "/../../site/" + f);

    styl.render(function(err, css){
      if (err) throw err;

      var oldfile = files[f];
      oldfile.contents = new Buffer(css);

      delete files[f];

      var newname = f.split('.');
      newname.pop();
      newname.push('css');

      files[newname.join('.')] = oldfile;
      process.nextTick(done);
    });
  }
}
