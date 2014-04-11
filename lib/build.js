var Metalsmith = require('Metalsmith')
  , drafts = require('metalsmith-drafts')
  , collections = require('metalsmith-collections')
  , moment = require('moment')

  , site = require('..');

var groups = {
  articles: {
    sortBy: 'date',
    reverse: true
  }
}

var md_opts = {
  smartypants: true,
  gfm: true,
  tables: true
}

module.exports = function build(o,cb){
  Metalsmith(o.base)
    .source(o.site)
    .destination(o.dest)

    //basic data aggregation
    .metadata(fetchData())

    //fix dates from yaml-js
    .use(function(files,ms,done){
      Object.keys(files).forEach(function(f){
        var file = files[f];
        file.date = file.date ? moment.utc(files[f].date) : moment.utc();
      });
      process.nextTick(done);
    })

    .use(drafts())

    //process articles
    .use(site.articles)

    //seperate
    .use(collections(groups))

    //remove other templates/includes
    .use(site.exclude(/\/*_.*/))

    //render stuff
    .use(site.html)
    .use(site.css)
    .use(site.js)

    .use(cleanup)

    .build(function(err,files){
      cb(err,files);
    })
}

function cleanup(files,ms,done){
  files['atom.xml'] = files['atom.html'];
  delete files['atom.html'];
  process.nextTick(done);
}

function fetchData(){
  var data = require('../site.json');
  data.date = moment().utc();
  var prefixes = [];
  for(var k in data["prefix"]){
    prefixes.push(k + ": " + data["prefix"][k]);
  }
  data["prefix"] = prefixes.join(" ");
  data["layouts"] = __dirname + '/../layouts';
  return data;
}

