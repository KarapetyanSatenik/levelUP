Scope on the other hand defines the way JavaScript resolves a variable at run time. There are only two four scopes in JavaScript -- global, function, block, and module scopes. Moreover, it also deals with something called "scope chain" that makes closures possible.
 
Your on method saves the variable scope and then uses it in the trigger function as context, which is confusing (it shouldn't be named scope -- it's the context):

handler.method.call(
    handler.scope, this, type, data
)
And I have no idea what this is in the above call.
The on method also accepts a context which defaults to the supplied scope in case context is falsy. This context is then used to filter the functions to call in trigger.
context !== handler.context
This lets you group your handlers by associating them with an arbitrary object (which they have called context) and then invoke the entire group by just specifying the context.
Again, I think this code is overly convoluted and could have been written in a lot simpler way. But then, you shouldn't need to write your own event emitters like this in the first place -- every library has them ready for your use.
Share
Follow


2138
A function is a piece of code that is called by name. It can be passed data to operate on (i.e. the parameters) and can optionally return data (the return value). All data that is passed to a function is explicitly passed.
A method is a piece of code that is called by a name that is associated with an object. In most respects it is identical to a function except for two key differences:
1.	A method is implicitly passed the object on which it was called.
2.	A method is able to operate on data that is contained within the class (remembering that an object is an instance of a class - the class is the definition, the object is an instance of that data).
3.	Function — a set of instructions that perform a task. We can define a 
4.	function using the function keyword, followed by Name and optional parameters. 
5.	Body of function is enclosed in Curly braces.
6.	
7.	
8.	Method — a set of instructions that are associated with an object. 
9.	A JavaScript method is a property of an object that contains a function 
10.	definition. Methods are functions stored as object properties.
11.	Object method can be accessed with the following syntax:
12.	object = {
13.	    methodName: function() {
14.	        // Content
15.	    }
16.	};
17.	
18.	object.methodName()




Require modules at the beginning of each file, before and outside of any functions. This simple best practice will not only help you easily and quickly tell the dependencies of a file right at the top but also avoids a couple of potential problems
Otherwise: Requires are run synchronously by Node.js. If they are called from within a function, it may block other requests from being handled at a more critical time. Also, if a required module or any of its dependencies throw an error and crash the server, it is best to find out about it as soon as possible, which might not be the case if that module is required from within a function
== will compare two variables after converting them to a common type
Use Async Await, avoid callbacks
TL;DR: Node 8 LTS now has full support for Async-await. This is a new way of dealing with asynchronous code which supersedes callbacks and promises. Async-await is non-blocking, and it makes asynchronous code look synchronous. The best gift you can give to your code is using async-await which provides a much more compact and familiar code syntax like try-catch
Validate incoming JSON schemas
   
TL;DR: Validate the incoming requests' body payload and ensure it meets expectations, fail fast if it doesn't. To avoid tedious validation coding within each route you may use lightweight JSON-based validation schemas such as jsonschema or joi
Otherwise: Your generosity and permissive approach greatly increases the attack surface and encourages the attacker to try out many inputs until they find some combination to crash the application
Hide error details from clients
 
TL;DR: An integrated express error handler hides the error details by default. However, great are the chances that you implement your own error handling logic with custom Error objects (considered by many as a best practice). If you do so, ensure not to return the entire Error object to the client, which might contain some sensitive application details
Otherwise: Sensitive application details such as server file paths, third party modules in use, and other internal workflows of the application which could be exploited by an attacker, could be leaked from information found in a stack trace
 7.1. Don't block the event loop
TL;DR: Avoid CPU intensive tasks as they will block the mostly single-threaded Event Loop and offload those to a dedicated thread, process or even a different technology based on the context.
Otherwise: As the Event Loop is blocked, Node.js will be unable to handle other request thus causing delays for concurrent users. 3000 users are waiting for a response, the content is ready to be served, but one single request blocks the server from dispatching the results back

