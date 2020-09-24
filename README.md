## Bug Report

[vscode-js-debug](https://github.com/microsoft/vscode-js-debug) will [inject](https://github.com/microsoft/vscode-js-debug/blob/9b24a1420f7ce6b4a587e2386de3646ab4834101/src/targets/node/nodeLauncherBase.ts#L320) an env `NODE_OPTIONS`.

Which will cause a bug of Node.js 10.x to crash when fork child process.

### Code

```js
const cp = require('child_process');
const path = require('path');

console.log(process.env.NODE_OPTIONS);
console.log(process.execPath);
console.log(process.version);

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
```

### Bad

10.x is crash.

Step:

```json
{
  "dependencies": {
    "node": "^10.22.1"
  }
}
```

Run:

```bash
$ npm i
$ npm start

Error: Cannot find module '"/path/to/test-tnpm/lib'
```

### Good

Change node to 12.x, it works.

Step:

```json
{
  "dependencies": {
    "node": "^12.15.0"
  }
}
```

Run:

```bash
$ rm -rf node_modules
$ npm i
$ npm start
```
