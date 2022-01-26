/**
 *  blocking/ synchronous code : are code that executes one by one by finishing statements
 *  one by one in code for example : 
 *  we have used readFilesync() function in our last program code prsent
 *  below this function is not get executed unless reading for file is done
 *  so this is blocking code for others, because nodejs is single threaded
 *  and if you have thousands of user of your application and reading huge
 *  files by one user can take time so this will become bocking code of other  users.
 * 
 *  one solution is to used : Non-blocking/ Asynchronous programming 
 *  for example : 
 *  reading a huge file can be done in background using Asynchronous 
 *  readFile() method with blocking the other users. 
 *  readFile()  register a callback function and when the reading data
 *  is completed it executes the callback function.
 *  
 *   note: having a callback function in another function doesn't
 *   make code aynchronous there are built-in function for that. 
 *  
 */

// reading and writting file asynchronous
const fs=require('fs');

/**
 *  readFile(path of file , character encoding , callback function )
 *  reads the file asynchronously and when reading is done callback 
 *  function is called.
 */
/**
 *  writeFile(path of file , data we want to write , character encoding , callback function)
 *  writes the data into files asynchronously and when data writting is done it calls the
 *  callback function.
 */
fs.readFile('./input.txt','utf-8' ,(err ,data)=>{
    // this will data in back ground and after finishing that read callback function is called
    if(err) return console.log('ERROR ❎');
    // if any error occurs this message is displayed : ERROR ❎
    console.log('data1 is :' , data);
    fs.readFile(`./${data}.txt` , 'utf-8' ,(err , data2)=>{
        // forming a relationship between these callbacks
        console.log('data2 read is :', data2);
        fs.readFile('./append.txt' , 'utf-8', (err , data3)=>{
            console.log('data3 read is : ', data3);
            // writing file asynchronously
            fs.writeFile('./text2.txt',`${data2}\n${data3}` ,'utf-8',err=>{
                console.log('your file has been written.');
            });
        });
    });
});
// callbacks makes relationships and countinous calling of call backs in one another is 'callback hell'
console.log('Read file'); // this will print first

/**
 *  Notice the output pattern in the console :
 *           Read file
             data1 is : text
             data2 read is : This is an apple � and this is an orange � both are differant .
             data3 read is :  This is just testing of reading file ansynchronously.
             your file has been written.

   'Read file' got printed first because file reading and writting actually 
   happening in the background and callbacks forms relationship other task 
   present in callback completes after that.
 */