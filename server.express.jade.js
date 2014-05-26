// Modules Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');

// Set port number
var portNumber = 3000;

// Initialize Express
var app = express();
console.log("Express has been initialized");

function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib());
}

// Set Views Folder
app.set("views", __dirname + "/views");

// Initialize Jade
app.set("view engine", 'jade');
console.log("Jade has been initialized");

// Stylus Middleware
app.use(logger('dev'));
app.use(stylus.middleware(
	{
		src: __dirname + '/public',
		complie: compile
	}
));
app.use(express.static(__dirname + '/public'));

// Render Index Page
app.get('/', function(req, res) {
	res.render('index', {title: 'Welcome'});
});

app.listen(portNumber);
console.log("Server is now running on port: " + portNumber);


