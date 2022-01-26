/**
 * Writing and Reading from a file using fs module.
 */

// importing 'fs' module in our file
const fs= require('fs');

const textOut='This is an apple 🍎 and this is an orange 🍊 both are differant .';
// suppose this we want to add in file text.txt 

fs.writeFileSync('./text.txt' ,textOut); // synchronous way of writing data into file.
/**
 *  we use writeFileSync( file path , data ) or writeFile() to write a stream into the
 *  specified file name.
 * 
 *  if spcified file is not present node will create a file of that name.
 */
console.log('file written !!');

/**
 *  Reading a file .
 *  we use readFilesync() and readFile() to read a file and specify the 
 *  character encoding utf-8 .
 *  these function written a stream of data .
 */

const textIn = fs.readFileSync('./text.txt' , 'utf-8'); // storing into textIn variable.
/**
 * if we don't specify the character encoding it return the buffer of that file
 */

console.log('Data read from text.txt is : \n',textIn);

