## Unhandled Rejection

In Node.js, an unhandled rejection error/event is raised whenever an error or a rejected promise couldn’t find an error handler.

Consider following HTTP server that does a JSON parsing of request body:
```js
const http = require('http');
http.createServer((req, res) => {
    let raw="";
    req.on('data', chunk => raw+=chunk);
    req.on('end', () => {
        const d=JSON.parse(raw);
        res.statusCode=200;
        res.end();
    });
}).listen(5000);
```
If a client sends an invalid body, the server terminates due to an unhandled error:

A try-catch should be wrapped around JSON parsing, and also in all the places an error is expected.

For complex applications in which error handling may get missed (especially with async code like setTimeout, etc.), Node.js also provides a global error handler that can prevent the program from exiting:

```js
process.on('unhandledRejection', e => console.log(e)); //unhandled promise rejections
process.on('uncaughtException', e => console.log(e)); //unhandled errors
```
With these global error handlers in place, the program won’t crash upon encountering an unhandled error or promise rejection:

```js
const http = require('http');
process.on('unhandledRejection', e => console.log(e));
process.on('uncaughtException', e => console.log(e));
http.createServer((req, res) => {
    let raw="";
    req.on('data', chunk => raw+=chunk);
    req.on('end', () => {
        const d=JSON.parse(raw);
        res.statusCode=202;
    });
}).listen(5000);
```
```js
--
> curl http://localhost:5000
> curl http://localhost:5000
--
> node app.js 
SyntaxError: Unexpected token u in JSON at position 0
    at JSON.parse (<anonymous>)
    at IncomingMessage.<anonymous> (/Users/mayankc/Work/source/denoExamples/app.js:8:22)
    at IncomingMessage.emit (node:events:406:35)
    at endReadableNT (node:internal/streams/readable:1331:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
SyntaxError: Unexpected token u in JSON at position 0
    at JSON.parse (<anonymous>)
    at IncomingMessage.<anonymous> (/Users/mayankc/Work/source/denoExamples/app.js:8:22)
    at IncomingMessage.emit (node:events:406:35)
    at endReadableNT (node:internal/streams/readable:1331:12)
    at processTicksAndRejections (node:internal/process/task_queues:83:21)
```
Ideally, exceptions should be handled by application. The global error handlers are fail-safe, mostly to prevent the app from crashing.
