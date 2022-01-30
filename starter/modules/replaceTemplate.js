// just creating module of replaceTemplate fuction and importing in nodejs

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
  } ;

  // we can export relaceTemplate fuction in other files using export module statements
  module.exports=replaceTemplate;
  // now we can use this function in any file by simpally requiring this. for example in index.js
