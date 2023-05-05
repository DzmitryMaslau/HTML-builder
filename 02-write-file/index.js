const fs = require('fs');
const process = require('process');
const { stdin, stdout } = process;
const path = require('path');
let writeableStream = fs.createWriteStream(path.join(__dirname, 'new.txt'));
console.log("Please, write some text");

stdin.on('data', (data) => {
    if (data.toString().trim() == 'exit') {
        console.log('Good by. Have a nice day');
        fs.truncate('new.txt', err => {
            if(err) throw err;
         });
        process.exit();
    }
    console.log('Please, write some text');
    writeableStream.write(data);

  });
  process.stdin.resume();

  process.on('SIGINT', () => {
      console.log('Good by. Have a nice day');
      fs.truncate('new.txt', err => {
        if(err) throw err;
     });
    process.exit();
  });
