// import http from 'http';
let http=require('http');
let server=http.createServer();
server.on('request',function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello world\n');
})
server.listen(3000);
console.log('Server running at http://localhost:3000/');