- closure has been added in ES3 in 1999
- public class has been added in ES4 but for political reason it died
- we also have E4X. In E4X we could put xml in JS, and it was precursor to the idea of JSX. This also died.
- in 2009 we have es5 after 10 years ago. We got strict mood, 
that was the huge change set all of these changes that actually had been building up since es4 finally landed all at once and this one giant change set so this was definitely not a baby step but it was comprised of a bunch of ideas that had been baby steps along the way.
- ES6 are often called es2015 because technically very late in the game the tc39 committee decided to rename it from es6 to es 2015.

The next is ES 2016 many people called that es7 and you're also bad for calling it
es7 because it's called es 2016 that is the official name for the language, So don't call it es7 call it es 2016.
ES 2017- Async Await
ES 2018 async generators.
```js 
function foo(){
    return function zoo(){
        this.n = 13
    }
}

let a = foo.call(null)

console.log(new a());
```

```js
var a = 12 // configurable true
b = 13 // configurable false
```
js engine runs our js code.
V8 engine makes our js code run very efficiently.
node is a javascript runtime build on chrome's b8 engine.
V8 engine is going to read our js code and any time it see something which isn't part of js, it's going to communicate with libuv.
Libuv is written bu C, C++, and v8 engine is written by js and c++, and what has ryan done, he created bindings between them, so they can communicate.
So when we have a async I/O operations, we handle it over to the libuv.
Browser also is a JS runtime.
A browser contains a Javascript engine (for example Chrome v8). The engine implements a Javascript runtime, which includes the call stack, heap and event loop. The browser also usually includes a set of APIs that augment the Javascript runtime and make asynchronous code execution possible. NodeJS also implements a Javascript runtime using Chrome's v8 engine as well as the Libuv library (event loop and worker threads).
Dino

node.js bindings are what lets your js code call functionality that's implemented in c, c++.
For much of their functionality the node APIs will call into these C++ node.js bindings. 
the actual implementation of some node apis(fs) lives in libuv.
so for example when we have a request task to read some file, via node.js bindings node will pass that task to libuv, libuv will give to os for execution.
node shouldn't wait for execution of that request, it just says let me know when my task will compleat. this is called asyc i/o.

When we are calling node open, it via node binding will call open function written by c++.
that open c++ code will call function which is inside of libuv. Node allow us to use libuv by connecting to it with the node.js bindings which allow the functionality in libuv to be used by js.  We communicate with libuvi via c++ bindings. 

fs.open(js)=>bindings.open(c++)=>libuv.open(c)

Sync means code that runs line by line in sequence. Async is code that doesn't necessary run line by line. 
Blocking code executes synchronously.


The main thread of Node runs the V8 engine.
Specifically Libuvi handles two main types of I/O` FS and network operations, we are able to execute all of the functions async thank to event loop. Event loop is code in libuvi that runs async functions and executes the corresponding callbacks when the result of the functions is ready. 
Some tasks related to network operations for example taking to server over the internet are done directly in you os, while other tasks like reading a file are done in thread pool. 

There is one main thread that's executing v8 as well as the event loop. This mechanism saves our CPU from doing the additional work of creating and destroying new threads for every task. 
for FS operations the libuvi will send the task to one of the threads which will execute our task independently of the other threads in our application including main thread which is running our js code, so this will happen in background, and when the operation compleats the event loop will get notified of the results executing the corresponding cb and making sure that our application is running smoothly. 
But only some operation use these thread pools. Libuvi uses the os directly, specifically the os kernel which talks to the computer's hardware and has multiple threads of its own. the kernel is really good doing basic operations like talking to other computers over the network. 
Libuvi will save the thread pools as valuable resource for only fs operations. And so for most async operations we skip over these  thread pool. When our operation finishes running in the os the event loop will receive the signal and execute the cb.
All of this is what allows the node.js environment to run async code. 


Event loop lives in libuvi that processes async events.  
When node executes async functions for example setTimeOut that operation is sent off to be executed in the background. As we know this operation is executed in os or on the thread pool. When that operation is finished and the result is ready node places that cb to queue.
In case of settimeout when the timer is expired the cb is added in queue to be executed as soon as posable. 

There are tree type of timers` settimeout setinterval, setimediate.




Process object is an instance of EventEmitter, and has on function which can react to different events that are emited at  different stages of the node process lifecycle. 0- for success operation.

In node require is global object which is not part of vanilla js, this function takes js file executes it and then returns the code from that file.


Best practice
//fs.js
module.export = {
    read,
    write
}

//send.js
const {read} = require("./fs")

when we use require, we use common js standard.

Module.js

1. for relative paths like './start.js' or ../config.mjs' the file extension is always necessary for these.


- Modules or API's
There are multiple APIs available, each with their own advantages and disadvantages. Under the hood, they are all based on the same implementation. 
- Streams is the recommended approach if you need a maximum of power. It ensures scalability by treating your data as a stream from the source to the destination. 

- web server

when we click for example www.facebook.dom, the request will sent to dns on which the site is leaving and  it will provide us the ip address(usually 8 number 12 32 45 64 and also we can mention the type of server 12 32 45 64:80), and the we will make a http request to the http server. 

req(readable) and res(writeable) are streams
So it means that when we do post request sending json object, our json object is converted to Buffer, cuz req and res are streams then we need to convert that buffer to stream or json.object

origin is combination of tree things` protocol(https), host(www.google.com), port(443)

## Express

it's a good practice always return a json object even if it's an error.
Middleware is a special function that runs between or in the middle low the request coming in and the response coming out of our API.

request => 1 middleware => next() => 2 rout handler middleware => res.send() => back to 1 middleware => res send to the client.


Post request.
if the client send us data in for of json object, our server doesn't understand json out of box. In case of http core module, it parse json data for every post request.
In case of express we have express.json() built-in middleware, which gives us opportunity to write one one line code, and that line will be worked when we have a post request.
express.json based on body-parser and only parses JSON and only looks at requests where the content-type header matches the type option. 

A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

So when we do validations, we don't need to check the req.body, cuz our express.json() sets empty body object to req.body and it definitely will exist, we can check only properties of body object exist or not.

Arrow function, function declaration.
If we get error inside of function declaration, node will tell us, that we have an error in that function, but if we get an error in arrow function node will not able to give us that additional information.


let str = "Hello";

str.test = 5; // (*)

alert(str.test);
Depending on whether you have use strict or not, the result may be:

undefined (no strict mode)
An error (strict mode).
Why? Let’s replay what’s happening at line (*):

When a property of str is accessed, a “wrapper object” is created.
In strict mode, writing into it is an error.
Otherwise, the operation with the property is carried on, the object gets the test property, but after that the “wrapper object” disappears, so in the last line str has no trace of the property.
This example clearly shows that primitives are not objects.

They can’t store additional data.

console.log is a function, that returns undefined.