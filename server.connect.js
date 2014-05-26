var connect = require('connect');
var port = 3000;

connect.createServer(
	connect.static(__dirname)
).listen(port);

console.log('You are connected at :' + port);
