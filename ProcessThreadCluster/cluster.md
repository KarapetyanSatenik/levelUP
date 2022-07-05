## The problem

Doing Input-Output bound operations such as responding to an Http request, talking to a database, talking to other servers are the areas where a Nodejs application shines. This is because of its single-threaded nature which makes it possible to handle many requests quickly with low system resource consumption. But Doing CPU bound operations like calculating the Fibonacci of a number or checking if a number is prime or not or heavy machine learning stuff is gonna make the application struggle because node only uses a single core of your CPU no matter how many cores you have.

If we are running this heavy CPU bound operation in the context of a web application,the single thread of node will be blocked and hence the webserver won't be able to respond to any request because it is busy calculating our big Fibonacci or something.

Allow me to demonstrate an example of this behavior using an express server.

All examples provided below will be in the context of a web application, but the same logic applies for any kind of nodejs application.

server.js
```js
const express = require("express")
Copy
const app = express()

app.get("/getfibonacci", (req, res) => {
  const startTime = new Date()
  const result = fibonacci(parseInt(req.query.number)) //parseInt is for converting string to number
  const endTime = new Date()
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  })
})

const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

app.listen(3000, () => console.log("listening on port 3000"))
```

We are using simple CPU intensive tasks such as finding Fibonacci here for the sake of simplicity. In a real-case scenario it may be something like compressing a video or doing machine learning operations.

app hanging when large number is given
Here we can see the "testrequest" being blocked and hanged while "getfibonacci"(which takes forever for 50) is being executed.
system-monitor

A single core of the CPU is doing all the work.
Wait, Cant Promises solve this problem?
This may be a stupid doubt but For a brief moment, while I was researching for this article, I thought "Isnt promises supposed to solve this problem?, Isnt promises supposed to unblock stuff by doing things asynchronously?". Well yes, but no.

yesbutnomeme

I found a question on stackoverflow with the same doubt.
Let us take a look to the same problem but with promises (we are going to use a prime or not function this time because using promises in a recursive function can get messy).

serverWithPromises.js
```js
const express = require("express")
Copy
const app = express()

app.get("/isprime", async (req, res) => {
  const startTime = new Date()
  const result = await isPrime(parseInt(req.query.number)) //parseInt is for converting string to number
  const endTime = new Date()
  res.json({
    number: parseInt(req.query.number),
    isprime: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

const isPrime = number => {
  return new Promise(resolve => {
    let isPrime = true
    for (let i = 3; i < number; i++) {
      if (number % i === 0) {
        isPrime = false
        break
      }
    }

    resolve(isPrime)
  })
}

app.listen(3000, () => console.log("listening on port 3000"))
```

app hanging when large number is given
We can see the same result with promises
The reason for this is that even though promises are being run asynchronously the promise executor function(our prime or not function) is called synchronously and will block our app. The reason why promises are glorified in the javascript community as a way to do "asynchronous non-blocking operations" is because they are good at doing jobs that take more time, but not more CPU power. By "doing jobs that take more time" I meant jobs like talking to a database, talking to another server, etc which is 99% of what web servers do. These jobs are not immediate and will take relatively more time. Javascript promises accomplish this by pushing the job to a special queue and listening for an event (like a database has returned with data) to happen and do a function (often referred to as a "callback function") when that event has happened. but hey, won't another thread will be required to listen for that event? , Yes it does. How node manages this queues,events and listening threads internally can be a separate article of itself .

Let us see the asynchronous non-blocking operations in action.

asyncServer.js
```js
const express = require("express")
Copy
const app = express()
const fetch = require("node-fetch") //node-fetch is a library used to make http request in nodejs.

app.get("/calltoslowserver", async (req, res) => {
  const result = await fetch("http://localhost:5000/slowrequest") //fetch returns a promise
  const resJson = await result.json()
  res.json(resJson)
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(4000, () => console.log("listening on port 4000"))
see code on github
slowServer.js

const express = require("express")
Copy
const app = express()

app.get("/slowrequest", (req, res) => {
  setTimeout(() => res.json({ message: "sry i was late" }), 10000) //setTimeout is used to mock a network delay of 10 seconds
})

app.listen(5000, () => console.log("listening on port 5000"))
```


app hanging when large number is given
We can see that every other request is not blocked, even though the call to the slow server is taking too long. This is because the fetch function by node-fetch returns a promise. This single-threaded, non-blocking, asynchronous way of doing things is default in nodejs.

## The solution
Node js provides three solutions for solving this problem

- child processes
- cluster
- worker threads

### child processes
The child_process module provides the ability to spawn new processes which has their own memory. The communication between these processes is established through IPC (inter-process communication) provided by the operating system.

There are mainly three methods inside this module that we care about.

child_process.spawn()
child_process.fork()
child_process.exec()
child_process.spawn()
This method is used to spawn a child process asynchronously. This child process can be any command that can be run from a terminal.

spawn takes the following syntax:- spawn("comand to run","array of arguments",optionsObject)

The optionsObject have a variety of settings which can be found in official nodejs documentation.

The code below spawns an ls (list directory) process with arguments -lash and the directory name from query strings and sends its output back.

childspawnServer.js
```js
const express = require("express")
Copy
const app = express()
const { spawn } = require("child_process") //equal to const spawn = require('child_process').spawn

app.get("/ls", (req, res) => {
  const ls = spawn("ls", ["-lash", req.query.directory])
  ls.stdout.on("data", data => {
    //Pipe (connection) between stdin,stdout,stderr are established between the parent
    //node.js process and spawned subprocess and we can listen the data event on the stdout

    res.write(data.toString()) //date would be coming as streams(chunks of data)
    // since res is a writable stream,we are writing to it
  })
  ls.on("close", code => {
    console.log(`child process exited with code ${code}`)
    res.end() //finally all the written streams are send back when the subprocess exit
  })
})

app.listen(7000, () => console.log("listening on port 7000"))
```


ls-output

Nothing is stopping us from spawning a nodejs process and doing another task there, but fork() is a better way to do so.

child_process.fork()
child_process.fork() is specifically used to spawn new nodejs processes. Like spawn, the returned childProcess object will have built-in IPC communication channel that allows messages to be passed back and forth between the parent and child.

fork takes the following syntax:- fork("path to module","array of arguments","optionsObject")

The optionsObject have a variety of settings which can be found in official nodejs documentation.

Using fork(), we can solve the problem discussed above by forking a separate nodejs process and executing the function in that process and return the answer to the parent process whenever it is done. In that way, the parent process won't be blocked and can continue responding to requests.

childforkServer.js
```js
const express = require("express")
Copy
const app = express()
const { fork } = require("child_process")

app.get("/isprime", (req, res) => {
  const childProcess = fork("./forkedchild.js") //the first argument to fork() is the name of the js file to be run by the child process
  childProcess.send({ number: parseInt(req.query.number) }) //send method is used to send message to child process through IPC
  const startTime = new Date()
  childProcess.on("message", message => {
    //on("message") method is used to listen for messages send by the child process
    const endTime = new Date()
    res.json({
      ...message,
      time: endTime.getTime() - startTime.getTime() + "ms",
    })
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(3636, () => console.log("listening on port 3636"))
see code on github
*forkedchild.js

process.on("message", message => {
Copy
  //child process is listening for messages by the parent process
  const result = isPrime(message.number)
  process.send(result)
  process.exit() // make sure to use exit() to prevent orphaned processes
})

function isPrime(number) {
  let isPrime = true

  for (let i = 3; i < number; i++) {
    if (number % i === 0) {
      isPrime = false
      break
    }
  }

  return {
    number: number,
    isPrime: isPrime,
  }
}
```


app not hanging when large number is given
Hurray! our app is no longer blocking
Caveats
Only parent to child process communication is possible and there is no child to child communication.
Separate memory is allocated for each child process which means that there is a time and resource overhead.

### Worker threads
Worker threads can be used to solve the above-mentioned caveats with child processes because worker threads share memory and communication between threads is possible. Essentially the difference between worker threads and child processes is same as the difference between a thread and a process.Ideally, the number of threads created should be equal to number of cpu cores.

let's compare the default single thread and multi thread with worker threads performance.

singleThreadServer.js
```js
const express = require("express")
Copy
const app = express()

function sumOfPrimes(n) {
  var sum = 0
  for (var i = 2; i <= n; i++) {
    for (var j = 2; j <= i / 2; j++) {
      if (i % j == 0) {
        break
      }
    }
    if (j > i / 2) {
      sum += i
    }
  }
  return sum
}

app.get("/sumofprimes", (req, res) => {
  const startTime = new Date().getTime()
  const sum = sumOfPrimes(req.query.number)
  const endTime = new Date().getTime()
  res.json({
    number: req.query.number,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.listen(6767, () => console.log("listening on port 6767"))
```

single-threaded-server

It takes around 50 seconds to calculate the sum of prime numbers up to 600 thousand

sumOfPrimesWorker.js
```js
const { workerData, parentPort } = require("worker_threads")
Copy
//workerData will be the second argument of the Worker constructor in multiThreadServer.js

const start = workerData.start
const end = workerData.end

var sum = 0
for (var i = start; i <= end; i++) {
  for (var j = 2; j <= i / 2; j++) {
    if (i % j == 0) {
      break
    }
  }
  if (j > i / 2) {
    sum += i
  }
}

parentPort.postMessage({
  //send message with the result back to the parent process
  start: start,
  end: end,
  result: sum,
})
see code on github
multiThreadServer.js

const express = require("express")
Copy
const app = express()
const { Worker } = require("worker_threads")

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    //first argument is filename of the worker
    const worker = new Worker("./sumOfPrimesWorker.js", {
      workerData,
    })
    worker.on("message", resolve) //This promise is gonna resolve when messages comes back from the worker thread
    worker.on("error", reject)
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

function divideWorkAndGetSum() {
  // we are hardcoding the value 600000 for simplicity and dividing it
  //into 4 equal parts

  const start1 = 2
  const end1 = 150000
  const start2 = 150001
  const end2 = 300000
  const start3 = 300001
  const end3 = 450000
  const start4 = 450001
  const end4 = 600000
  //allocating each worker seperate parts
  const worker1 = runWorker({ start: start1, end: end1 })
  const worker2 = runWorker({ start: start2, end: end2 })
  const worker3 = runWorker({ start: start3, end: end3 })
  const worker4 = runWorker({ start: start4, end: end4 })
  //Promise.all resolve only when all the promises inside the array has resolved
  return Promise.all([worker1, worker2, worker3, worker4])
}

app.get("/sumofprimeswiththreads", async (req, res) => {
  const startTime = new Date().getTime()
  const sum = await divideWorkAndGetSum()
    .then(
      (
        values //values is an array containing all the resolved values
      ) => values.reduce((accumulator, part) => accumulator + part.result, 0) //reduce is used to sum all the results from the workers
    )
    .then(finalAnswer => finalAnswer)

  const endTime = new Date().getTime()
  res.json({
    number: 600000,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.listen(7777, () => console.log("listening on port 7777"))

```

multi-thread-server

It takes only half of the time required for the single-threaded server
This is because, we are dividing the work into 4 equal parts and allocating each part to a worker and parallelly (at the same time) executing the task.

full-cpu

The 4 threads(workers) are running on all 4 cores of the cpu

### Cluster

Cluster is mainly used for vertically (adding more power to your existing machine) scale your nodejs web server. It is built on top of the child_process module. In an Http server, the cluster module uses child_process.fork() to automatically fork processes and sets up a master-slave architecture where the parent process distributes the incoming request to the child processes in a round-robin fashion. Ideally, the number of processes forked should be equal to the number of cpu cores your machine has.

let's build an express server using the cluster module.
```js
const cluster = require("cluster")
Copy
const http = require("http")
const cpuCount = require("os").cpus().length //returns no of cores our cpu have

if (cluster.isMaster) {
  masterProcess()
} else {
  childProcess()
}

function masterProcess() {
  console.log(`Master process ${process.pid} is running`)

  //fork workers.

  for (let i = 0; i < cpuCount; i++) {
    console.log(`Forking process number ${i}...`)
    cluster.fork() //creates new node js processes
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork() //forks a new process if any process dies
  })
}

function childProcess() {
  const express = require("express")
  const app = express()
  //workers can share TCP connection

  app.get("/", (req, res) => {
    res.send(`hello from server ${process.pid}`)
  })

  app.listen(5555, () =>
    console.log(`server ${process.pid} listening on port 5555`)
  )
}
```

When we run the code above, what happens is that for the very first time cluster.isMaster will be true and masterProcess() function is executed. This function forks 4 nodejs processes (i have 4 cores in my cpu) and whenever another process is forked, the same file is run again but this time cluster.isMaster will be false because the process is now a child process since it is forked. So the control goes to the else condition. As a result, the childProcess() function is executed 4 times and 4 instances of an express server are created. Subsequent request are distributed to the four servers in a round-robin fashion. This helps us to use 100% of our cpu. The node js documentation also says that there are some built-in smarts to avoid overloading a worker process.

The cluster module is the easiest and fastest way to vertically scale a simple nodejs server. For more advanced and elastic scaling, tools like docker containers and Kubernetes are used.

Conclusion
Even though Node js provides great support for multi-threading, that doesn't necessarily mean we should always make our web applications multi-threaded. Node js is built in such a way that the default single-threaded behavior is preferred over the multi-threaded behaviour for web-servers because web-servers tend to be IO-bound and nodejs is great for handling asynchronous IO operations with minimal system resources and Nodejs is famous for this feature. The extra overhead and complexity of another thread or process makes it really difficult for a programmer to work with simple IO tasks. But there are some cases where a web server does CPU bound operations and in such cases, it is really easy to spin up a worker thread or child process and delegate that task. So, our design architecture really boils down to our application's need and requirements and we should make decisions based on that.