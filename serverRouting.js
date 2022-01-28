const http =require('http');
const url= require('url')

// OUR SERVER
const server = http.createServer( (req, res)=>{
   

   const path = req.url;  // storing url in path variable

  if( path=== '/' || path=== '/overview'){
      res.end('This is the overview.');
  }else if(path=== '/product'){
      res.end('This is the product')
  }else{
      res.writeHead(404 , { 
          'Content-type' : 'text/html',
          'own-header' : 'hye-node-server'
      });
      res.end('<h3>Page not found !!</h3>');
  }
});

server.listen(8000 ,'127.0.0.1' , ()=>{
    console.log('Listening to request on port 8000.');
})