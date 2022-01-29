const fs = require('fs');
const http =require('http');
const url= require('url')
/**
 *  for deploying this on heroku -
 *  port should be : process.env.PORT
 *  host should be : '0.0.0.0' 
 */
const port= process.env.PORT || 8000; 
const host= '0.0.0.0' ||'127.0.0.1';

/**
 *  deplyed on : https://kailash-farm-app.herokuapp.com/
 */
// reading all files synchronously on happens once when server is started actually

// reading data.json file here
const data= fs.readFileSync('./starter/dev-data/data.json', 'utf-8' );

// reading template-overview.html
const tempOverview =fs.readFileSync('./starter/templates/template-overview.html' , 'utf-8');

// reading template-card.html
const tempCard =fs.readFileSync('./starter/templates/template-card.html' , 'utf-8');


// reading template-product.html
const tempProduct =fs.readFileSync('./starter/templates/template-product.html' , 'utf-8');

// parsing data.json into js array that contains object of product details
const dataObj= JSON.parse(data);


const replaceTemplate=(temp , product)=>{
  // replacing each place holder of a card with their value
    let output= temp.replace(/{%PRODUCTNAME%}/g , product.productName);
    output=output.replace(/{%IMAGE%}/g , product.image);
    output=output.replace(/{%PRICE%}/g , product.price);
    output=output.replace(/{%FROM%}/g , product.from);
    output=output.replace(/{%NUTRIENTS%}/g , product.nutrients);
    output=output.replace(/{%QUANTITY%}/g , product.quantity);
    output=output.replace(/{%ID%}/g , product.id);
    output=output.replace(/{%DESCRIPTION%}/g , product.description);
    
    if(!product.organic){
    output=output.replace(/{%NOT_ORGANIC%}/g , "not-organic");

    }

    return output;
} 


// OUR SERVER
const server = http.createServer( (req, res)=>{
   

  /**
   * parsing url to js object and then destructing the 
   * object and taking query object and pathname .
   * 
   * for having actual parsed object just do this : 
   *             
   *          console.log(url.parse(req.url , true) );
   */
   const {query , pathname:path}= url.parse(req.url , true) ;
   // pathname is actual property of url parsed object and path is optional that i have given

  if( path=== '/' || path=== '/overview'){
      // overview page

    // writting head for overview page response  
    res.writeHead(200, {'Content-type':'text/html'});
    
    /**
     *  first of all we will create cards for overview page from dataObj
     *  dataObj is an array with product details as object element so we will 
     *  iterate over dataObj and change tempCard with dataObj details with 
     *  replace able placeholder present in tempCard string-html and since
     *  we need overview page as html string format so we use join('') by
     *  empty string.
     */
    const cardHtml= dataObj.map(el => replaceTemplate(tempCard , el )).join('');
    
    /**
     *  we need to replace place holder  '{%PRODUCT_CARD%}' with cardHtml
     * so that we can get over overview page.
     */
    const finalOutput= tempOverview.replace('{%PRODUCT_CARD%}' , cardHtml);

    // sending response as finalOutput
    res.end(finalOutput);
  }else if(path=== '/product'){
      // product page
    res.writeHead(200 , {'Content-type' : 'text/html'});

    /**
     *  the destructered url query object is 
     *   query={ id : '0'} 
     *  
     *  it has property id when we want to see the product details of crossponding id 
     *  for like '0' for 'Fresh Avocados ', '1' for 'Goat and Sheep Cheese' and 
     *   '2' for "Apollo Broccoli" and etc.
     *  
     * so what we can do is we can grab that details from dataObj array by accessing
     *  throgh its index which is id value for each product object in dataObj
     * 
     */

    //grabing the url query id object and storing it into product which is now an object
    const product= dataObj[query.id];
    // console.log(product); will give object of product details

    // replace details present as object in 'product' in template-product and storing it in output
    const output = replaceTemplate(tempProduct , product);

    // sending reponse 
    res.end(output);
  }else if(path=== '/api'){
      //API page
    // here we will serve json data to user 
    res.writeHead(200 , {'Content-type' : 'application/json'});

        // sending response to user the data read from data.json
    res.end(data);
    
}else{
      res.writeHead(404 , { 
          'Content-type' : 'text/html',
          'own-header' : 'hye-node-server'
      });
      res.end('<h3>Page not found !!</h3>');
  }
});

server.listen(port ,host , ()=>{
    console.log('Listening to request on port 8000.');
})


