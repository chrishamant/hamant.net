var restify = require('restify');
var bunyan = require('bunyan');

var server = restify.createServer({
  name: 'insightdb',
  version : "0.1.0"
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.on('after', restify.auditLogger({
  log: bunyan.createLogger({
    name: 'audit',
    stream: process.stdout
  })
}));

function send(req, res, next) {
  res.send('hello ' + req.params.name);
  return next();
}

server.post('/track/:thing', function track(req, res, next) {
  //take req.body and validate it against 'thing'
  res.send(201, req.body);
  return next();
});

server.listen(8080);
