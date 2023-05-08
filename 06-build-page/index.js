const path = require('path');
const fs = require('fs');
const pathStyles = path.join(__dirname, 'styles');
const pathCopy = path.join(__dirname, 'project-dist');
const pathAssetsCopy = path.join(pathCopy, 'assets');
const folderPath = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');

fs.readdir(pathStyles, {withFileTypes: true}, async (error, items) => {
    if (error) {
      console.log(error);
    }
    else {
      items.forEach(function(item, index) {
        let filePath = path.join(pathStyles, item.name);
        if (item.isFile() && item.name.split('.')[1] === 'css') {
          fs.readFile(filePath, 'utf8', function (error, data) {
              if (error) {
                console.log(error)
            } else if (index === 0) {
              fs.writeFile(path.join(pathCopy, 'style.css'), data, function (error) {
                if(error)
                  console.log(error);
              });
            }  else {
              fs.appendFile(path.join(pathCopy, 'style.css'), data, function(error) {
                if(error)
                  console.log(error);
              });
            }
          });
        }
      });
    }
  });
  function recursiveCopy(dir, exit) {
    fs.readdir(dir, {withFileTypes: true}, function (error, items) {
      if (error) throw error;
      items.forEach(function(item) {
        if (!item.isFile()) {
          fs.stat(path.join(exit, item.name), function(error) {
            if (error) {
              fs.mkdir(path.join(exit, item.name), function(error) {
                if (error) {
                  return console.error(error);
                }
                            });
              recursiveCopy(`${dir}\\${item.name}`, path.join(exit, item.name));
            } else {
              recursiveCopy(`${dir}\\${item.name}`, path.join(exit, item.name));
            }
          });
        } else {
          fs.copyFile(`${dir}\\${item.name}`, `${exit}\\${item.name}`, function(error){
            if (error) throw error;
          });
        }
      });
    });
  }
  fs.stat (pathCopy, function (error) {
    if (error) {
      fs.mkdir(pathCopy, function (error) {
        if (error) {
          return console.error(error);
        }
        });
      createTemplate();
    } else {  fs.readdir(pathCopy, function (error)  {
      if (error)
        console.log(error);
      else {
  
        createTemplate();
      }
    });
    }
  });
  fs.stat (pathAssetsCopy, function (error) {
    if (error) {
      fs.mkdir(pathAssetsCopy, function(error) {
        if (error) {
          return console.error(error);
        }
  
      });
      recursiveCopy(pathAssets, pathAssetsCopy);
    } else {
      recursiveCopy(pathAssets, pathAssetsCopy);
    }
});
function createTemplate() {
    fs.copyFile(`${__dirname}\\template.html`, `${pathCopy}\\index.html`, function (error) {
      if (error) throw error;
      fs.readFile(`${pathCopy}\\index.html`, 'utf8', function(error, data) {
        if(error) throw error;
        fs.readdir(folderPath, {withFileTypes: true}, function (error, items) {
          if (error) throw error;

          items.forEach(function(item) {
            fs.readFile(`${folderPath}\\${item.name}`, 'utf8', function(error, dataFile) {
              if(error) throw error;
              let tagName = `{{${item.name.split('.')[0]}}}`;
              data = data.replace(tagName, dataFile);
              fs.writeFile(`${pathCopy}\\index.html`, data, function (error) {
                if(error)
                  console.log(error);});
            });
          });
        });
      });
    });
  }