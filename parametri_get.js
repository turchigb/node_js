var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
  var params = querystring.parse(url.parse(req.url).query);
  res.writeHead(200, {"Content-Type": "text/plain"});
  if ('firstname' in params && 'lastname' in params) {
    res.write('Il tuo nome: ' + params['firstname'] + ' ' + params['lastname']);
  } else {
    res.write('Tu hai un nome giusto?');
  }
  res.end();
});
server.listen(80);
