const fs = require('fs');
const path = require('path');
const route =  path.resolve('01-read-file', 'text.txt');
let data = '';
let readableStream = fs.createReadStream(route, 'utf8');
readableStream.on('data', chunk => data+=chunk);
readableStream.on('end', () => console.log(data));