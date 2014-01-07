  
var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes.js');


app = express();
app.set('port', 8000);
  

//my own middleware
app.use(function(request, response, next) {
  console.log('received '+request.method+' request at '+request.url);
  next();
});

//this is nice for viewing errors!
// process.on('uncaughtException', function (err) {
//     console.log(err);
// }); 


app.use(express.favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(request, response) {  //this will be different once we're using nginx
  response.redirect('/client/index.html');
});

app.get('/collocation', routes.collocation);
app.get('/frequency', routes.frequency);
app.post('/data', routes.receiveData);

app.use(express.static(__dirname + '/..'));
app.listen(app.get('port'));
console.log('express server listening on port %s', app.get('port'));