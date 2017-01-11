/**
* T-Mobile Data Collector API
* This application will use a create an API around a MySQL DB 
*/

var mysql = require('mysql');
var fs    = require('fs');
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
app.use(express.static(__dirname));

var host = '10.46.59.146';

app.get('/', function (req, res) {
  res.sendFile('/DATA/devel/ssh/doc.html');
});

app.get('/all', function (req, res) {
  var sqlquery = 'SELECT * from nodejs';
  console.log(sqlquery);
  var connection = mysql.createConnection({
  host     : 'host',
  user     : 'user',
  password : 'pass',
  database : 'nodejs'
  });

  connection.connect();
  
  connection.query(sqlquery, 
  	function(err, rows, fields) {
          if (err) throw err;
          res.json(rows)
      }
  );
  connection.end();
});

app.get('/host', function (req, res) {
  var sqlquery = 'SELECT distinct host from nodejs';
  console.log(sqlquery);
  var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'user',
  password : 'password',
  database : 'nodejs'
  });

  connection.connect();
  
  connection.query(sqlquery, 
    function(err, rows, fields) {
          if (err) throw err;
          res.json(rows)
      }
  );
  connection.end();
});

// Show all commands to run on a specific device
app.get('/cmd/:device', function (req, res) {
  var sqlquery = "SELECT cmd from nodejs where host = '" + req.params['device'] + "'";
  console.log(sqlquery);
  var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'user',
  password : 'pass',
  database : 'nodejs'
  });

  connection.connect();
  
  connection.query(sqlquery, 
    function(err, rows, fields) {
          if (err) throw err;
          res.json(rows)
      }
  );
  connection.end();
});

// Show all commands to run on a specific device
app.get('/all/:device', function (req, res) {
  var sqlquery = "SELECT * from nodejs where host = '" + req.params['device'] + "'";
  console.log(sqlquery);
  var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'user',
  password : 'pass',
  database : 'nodejs'
  });

  connection.connect();
  
  connection.query(sqlquery, 
    function(err, rows, fields) {
          if (err) throw err;
          res.json(rows)
      }
  );
  connection.end();
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
});

app.listen(3000, function (req, res) {
  console.log('Starting MySQL API');
});
