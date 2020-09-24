'use strict';

const cp = require('child_process');
const path = require('path');

console.log(process.env.NODE_OPTIONS);
console.log(process.execPath);
console.log(process.version);

// child process dirname contains a space
const filePath = path.join(__dirname, 'lib space/test.js');
console.log(filePath);

const child = cp.spawn(process.execPath,
  [ '-e', 'console.log(process.env.NODE_OPTIONS)' ],
  {
    stdio: 'inherit',
    env: {
      NODE_OPTIONS: `--require "${filePath}"`
    }
});

child.on('exit', function (code, signal) {
  console.log(code, signal)
});
