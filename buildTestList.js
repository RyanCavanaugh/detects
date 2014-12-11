var fs = require('fs');

var dir = fs.readdir('tests/positive', function(err, files) {
    fs.writeFile('tests-positive.txt', JSON.stringify(files));
});

var dir = fs.readdir('tests/negative', function(err, files) {
    fs.writeFile('tests-negative.txt', JSON.stringify(files));
});
