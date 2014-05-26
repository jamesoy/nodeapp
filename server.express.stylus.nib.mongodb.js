//Module Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodeapp');
var logger = require('morgan');
var parser = require('body-parser');
var method = require('method-override');
var cookie = require('cookie-parser');
var session = require('express-session');

//Set port number
var portnumber = 3000;

//Initialize Express
var app = express();
console.log('Express has been initialized');

function compile(str,path){
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

//Set Views Folder
app.set('views',__dirname+'/views');

//Initialize Jade
app.set('view engine', 'jade');
console.log('Jade has been initialized');

//Stylus Middleware
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded());
app.use(parser());
app.use(method());
app.use(cookie('mykey'));
app.use(session());
//app.use(app.router);
app.use(stylus.middleware(
	{
		src:__dirname + '/public',
		compile: compile
	}
))
app.use(express.static(__dirname+'/public'));

app.get('/',routes.index);
app.get('/userlist',routes.userlist(db));
app.post('/adduser',routes.adduser(db));

app.listen(portnumber);
console.log('Server is now running on port '+portnumber);