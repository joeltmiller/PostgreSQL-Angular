var express = require('express');
var app = express();
var index = require('./routes/index');
var bodyParser = require('body-parser');

var pg = require('pg');

var config = {
  database: 'friday',
  port: 5432
};

//Allow files to be fetched from HTML
app.use(express.static('public'));
//Allows a request.body to be posted
app.use(bodyParser.json());

app.use('/', index);

app.post('/addTask', function(request, response){
  var client = new pg.Client(config);
  console.log(request.body);
  var taskDesc = request.body.task;
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('INSERT INTO tasks (description) VALUES ($1)', [taskDesc], function(err, rows){
      if(err){
        console.log('Query error', err);
        response.sendStatus(500);
      } else {
        console.log('Great success');
        response.sendStatus(200);
      }

      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })

    })
  })

})

var server = app.listen(3000, handleServerStart);

function handleServerStart() {
  var port = server.address().port;
  console.log('Listening on port', port);
}
