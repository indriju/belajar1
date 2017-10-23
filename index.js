var url = require('url');
var http = require('http');
var fs = require('fs');
var path = require("path");

var app = http.createServer(function(request, response) {
 var uri;
 
 uri = url.parse(request.url).pathname;
 if (uri == '/') uri += 'index.html';
 uri = path.join(__dirname,uri);
 
 msg = fs.readFile(uri, function(err,msg){
  if(err){
   response.writeHead(404, {"Content-Type": "text/plain"});
   response.write("404 Not Found\n");
   response.end();
   return;
  } else {
   response.writeHead(200, {"Content-Type": 'text/html'});
   response.write(msg);
   response.end()
   console.log("Request OK");
  }
 });
});
var io = require('socket.io').listen(app);

io.on('connection', function(socket) {
    socket.on('pesan', function(data){
  console.log("Client mengirim pesan: " + data);
 });
 socket.on('jumlah', function(data){
  var hasil = data.a + data.b;
  socket.emit("jk", hasil);
 });
 socket.on('disconnect', function(){
  console.log("Client disconnected");
 });
});

io.on('connection', function(socket){
	//console.log('a user connection');
	socket.on('chat message', function(msg){
 		console.log("Client mengirim pesan: " + msg);
 });		
	
	socket.on('jumlah', function(msg){
   var hasil = msg;
   socket.emit('chat message',hasil);
									  
});
 });
app.listen(3000,function(){
    console.log("Listening on http://127.0.0.1:3000");
});