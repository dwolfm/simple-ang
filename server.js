'use strict';

// import modules
var express = require('express');
var app = express();

// setup env variables
var port = process.env.PORT || 3000;

// setup routes
app.use(express.static(__dirname + '/build'));

var fourOhfourRouter = express.Router();
require('./routes/404.js')(fourOhfourRouter);
app.use('*', fourOhfourRouter);

app.listen( port, function(){
	console.log('running server on port: ' + port);	
});
