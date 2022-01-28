const fs = require('fs');
const http =require('http');
const url= require('url')
/**
 * An API : is simpally a service aviliable to user that serves some data or service to user
 */
// OUR SERVER
const server = http.createServer( (req, res)=>{
   

   const path = req.url; 

  if( path=== '/' || path=== '/overview'){
      res.end('This is the overview.');
  }else if(path=== '/product'){
      res.end('This is the product')
  }else if(path=== '/api'){
    // here we will serve json data to user 


    // reading the file data.json asynchronously 
    fs.readFile('./starter/dev-data/data.json' , 'utf-8' , (err ,data)=>{
        const productData=  JSON.parse(data);
        // parsing data into js object format

        // writing header to specify the content type
        res.writeHead(200 , {'Content-type' : 'application/json'});

        // sending response to user the data read from data.json
        res.end(data);
    });   
    
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


