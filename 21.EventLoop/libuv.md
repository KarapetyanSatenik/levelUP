## libuv

In OS, operations can be blocking or non-blocking. Blocking operations require a separate thread to enable concurrent execution of different operations. However, non-blocking operations allow for simultaneous execution without additional threads.


Visualisation of Blocking and Non-Blocking I/O

File and DNS operations are blocking, meaning they block the thread until completion. On the other hand, network operations are non-blocking, enabling multiple requests to be sent from a single at the same time.

Different operating systems provide notification mechanisms for Non-Blocking I/O. In Linux it’s called epoll, in Windows, it’s called IOCP, and so on. These notification mechanisms allow us to add handlers and wait for operations to complete, they will notify us when a specific operation will be finished.

Libuv uses those mechanisms to allow us to work with the Network I/O asynchronously. But with the Blocking I/O operations, it’s different.

Think about it, Node.js operates on a single thread with an EventLoop, which runs in a semi-infinite loop. However, when it comes to Blocking I/O operations, Libuv cannot handle them within the same thread.

So for that reason, Libuv uses a Thread Pool.

CPU-intensive tasks and Blocking I/O operations pose challenges because we can’t handle them asynchronously. But fortunately, Libuv got a solution for that. Baisicly it utilizes threads to tackle such situations effectively.

With a default thread pool size of 4, Libuv handles file read operations by executing them within one of those threads. Once the operation is completed, the thread is released and Libuv delivers the corresponding response. This enables efficient handling of Blocking I/O operations in an asynchronous manner using the thread pool.

If you attempt to perform 10 file read operations, only 4 of them will initiate the process while the remaining 6 operations will wait until threads become available for execution.

If we want to perform numerous Blocking I/O operations and find that the default thread pool size of 4 is insufficient, we can easily increase the thread pool size.

For that, we need to use this ENV variable.

UV_THREADPOOL_SIZE=64 node script.js
So in this case Libuv will create a Thread Pool with 64 threads.

Please note that having an excessive number of threads in the thread pool can lead to performance issues. This is because maintaining numerous threads requires significant resources. Therefore, it is important to carefully consider the implications before working with this environment variable.

You may wonder why there are 71 threads instead of 64. The additional threads are utilized by V8 and other components for tasks such as garbage collection and code optimization. These operations require resources, which is why the thread count surpasses the expected 64 threads.

Note that if you don’t use any Blocking I/O operations, the thread pool will not be initialized. You will only observe multiple threads if the pool is initialized, which can be done by executing a single Blocking I/O operation.

require('fs').readFile(__filename, () => {}); // Blocking I/O

setInterval(() => {}, 3000);
In my example, I’ve used this piece of code.
Simply remove the first line and observe that the thread count is noticeably reduced.

The reason for this is that the interval operation is not a Blocking I/O operation, which means the Thread Pool is not initialized.

