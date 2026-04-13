'use strict';

var npm = require('npm');

npm.commands['run-script'](['test'], (error, ...results) => {
    console.log('done! ');
    console.log('error? ', error);
    console.log('results', results);
});
//# sourceMappingURL=index.js.map
