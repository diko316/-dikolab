import { commands } from 'npm';

commands['run-script'](['test'], (error, ...results) => {
    console.log('done! ');
    console.log('error? ', error);
    console.log('results', results);
});
//# sourceMappingURL=test.mjs.map
