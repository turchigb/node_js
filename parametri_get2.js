var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');

var callback=function(req, res) {
  var params = querystring.parse(url.parse(req.url).query);
  res.writeHead(200, {"Content-Type": "text/plain"});
  if ('id_cliente' in params) {
    //res.write('Il tuo nome: ' + params['lastname'] + ' ' + params['firstname']);
	inserisci_in_db(params);
  } else {
    res.write('Tu hai un nome giusto?');
  }
  res.end();
}

var server = http.createServer(callback);
server.listen(8000);

// La URL sarà del tipo
// http://localhost:8000/parametri_get2.js?id_cliente=6&nome=SuperSW&indirizzo=Roma

function inserisci_in_db(params)
{
	var connection = mysql.createConnection( {
	  host : 'localhost',
	  user : 'root',
	  password : 'root',
	  database : 'tirano'
	} );
	connection.connect();
	var queryString = "INSERT INTO tirano.clienti (id_cliente, nome, indirizzo) VALUES ("+params['id_cliente']+",'"+ params['nome']+"','"+ params['indirizzo']+"')";
	console.log("Query="+queryString);
	connection.query(queryString, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
  });
	connection.end();
}
