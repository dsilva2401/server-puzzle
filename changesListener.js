var shell = require('shelljs');

setInterval(function () {
    shell.exec('git pull origin master');
}, 5000);