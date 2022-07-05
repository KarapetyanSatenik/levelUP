## Worker thread

As per the Node documentation, The worker_threads module enables the use of threads that execute JavaScript in parallel. 

- Workers (threads) are useful for performing CPU-intensive JavaScript operations. They will not help much with I/O-intensive work. Node.js’s built-in asynchronous I/O operations are more efficient than Workers can be.

Unlike child_process or cluster, worker_threads can share memory. They do so by transferring ArrayBuffer instances or sharing SharedArrayBuffer instances.
worker thread provides you APIs to deal with CPU intensive tasks while still maintaining the responsive application.
Each worker thread is the new instance of the event loop, creating a worker thread gives you a new event loop, so the event loop running in the main thread is free to take new requests if you run CPU intensive task in a worker thread. one good thing is if any worker thread running out of memory then it will not take down other worker thread.
Worker threads don’t have all the mechanisms for thread synchronization like in other multi-threaded programming languages, however, we can pass messages back and forth between a worker thread and the main thread.

```js

const { Worker, isMainThread, parentPort } = require('worker_threads');

if(isMainThread) {
    console.log('main thread start...');
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log(`Worker: ${msg}`);
      });
    console.log("doing some random work in main thread..!!");
}else{
    parentPort.postMessage('hello from worker thread');
    cpuIntensiveTask(1000);
    parentPort.postMessage('i am working');
    cpuIntensiveTask(1000);
    parentPort.postMessage('task is done..!!');
}

function cpuIntensiveTask(timeInSecond) {
    const end = Date.now() + timeInSecond;
    while (Date.now() < end) { }
  }
```

Here you can observe that the main event loop was not blocked because of the worker thread doing some CPU intensive task. we immediately get the output from the main thread. the message is passed back from the worker got handled and logged later, the cpuIntensiveTask function is still blocking an event loop. It is blocking the Worker’s event loop, which left the main event loop free, to continue processing the user’s request.

Here we saw how we can pass messages from the worker thread to the main thread. now let’s see how we can pass data along with the messages from the main thread to the worker thread.
for that, we have to importworkerData from worker_thread then use it to pass data to the worker by passing an object to the worker constructor.

```js

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if(isMainThread) {
  console.log('main thread start...');

  const worker = new Worker(__filename, {
    workerData: {
      prefix: 'Received message',
      timeInSecond: 1000
    }
  });

  worker.on('message', (msg) => {
    console.log(`Worker: ${msg}`);
  });

  worker.postMessage('Done with my work.');
  
  console.log("doing some random work in main thread..!!");

} else {
  parentPort.on('message', (msg) => {
    console.log(`${workerData.prefix}: ${msg}`);
  });

  parentPort.postMessage('hello from worker thread');
  cpuIntensiveTask(workerData.timeInSecond);
  parentPort.postMessage('i am working');
  cpuIntensiveTask(workerData.timeInSecond);
  parentPort.postMessage('task is done..!!');
}

function cpuIntensiveTask(timeInSecond) {
    const end = Date.now() + timeInSecond;
    while (Date.now() < end) { }
}

```