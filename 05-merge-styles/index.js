let path = require('path');
let fs = require('fs');
let bundle = path.join(__dirname, 'project-dist', 'bundle.css');
let css = path.join(__dirname, 'styles');
fs.readdir(css, 'utf-8', function (error, items) {
    if (error)
    {throw error;}
    fs.writeFile(bundle, '', function (error) {
    if (error) {
      throw error;
    }
  });
  items.forEach(function (item) {
    if (path.parse(path.join(css, item)).ext === '.css') {
      let stream = fs.createReadStream(path.join(css, item));
      stream.on('data', function(data) {
        fs.appendFile(bundle, data, function(error) {
          if (error) {
            throw error;
          }});
      });
    }});
});