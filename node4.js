/**
 * Simple web - server using nodeJs
 * this use 'http' module of nodejs which gives us capability of networking.
 */
const http =require('http');

// OUR SERVER
const server = http.createServer( (req, res)=>{
   res.end('Hello from the server !!');
});

server.listen(8000 ,'127.0.0.1' , ()=>{
    console.log('Listening to request on port 8000.');
})