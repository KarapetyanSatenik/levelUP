
# execution context


You know, it may be surprising, but in my opinion, the most important concept and feature
of the JavaScript language to understand is execution context. The reason for that is
because if you have a good understanding of the JavaScript execution context, you'll have
a much easier time understanding some more advanced topics like hoisting, scopes, scope
chains, and closures. So with that in mind, what exactly is an execution context? Well,
to better understand it, let's first take a look at how we write software. One strategy
for writing software is to break our code up into separate pieces. These pieces have
a few different names. We can call them "functions," "modules," "packages," but they all exist
for a single purpose – to break apart and manage the complexity in our applications.
So here, what we have on this left side is some code. And then, on this right side, what
I've done is I've broken this code into different pieces. In this case, I've broken them into
functions.
 So we can see here that the right side is a little bit easier to read and to
comprehend than this left side, only by breaking some of the functionality up into different
functions. Now, instead of thinking like someone authoring the code, instead of thinking like
someone writing the code, think in terms of the JavaScript engine, whose job it is to
interpret code. Can we use this same strategy of separating code into pieces to manage the
complexity of interpreting code, just like we did in order to write it? It turns out
we can, and these pieces are called "execution contexts."

So just like functions or modules or packages allow you to manage the complexity of writing
code, execution contexts allow the JavaScript engine to manage the complexity of interpreting
and running your code. 

### global execution context

So the first execution context that gets created when the JavaScript engine runs your code is called the "global execution context." 
even without any code over here, we still get a global execution context.

Initially, this execution context will consist of two things, as you can see here We have
- a global object, which in the browser is the window object. If you're running JavaScript
in a Node environment, it's going to be called "global." 
- and then we also have a this object, which in the global execution context just points to the window object. 
So again, even if your program doesn't have any code inside of it, the JavaScript engine is still going to create a global execution context. 
And inside of that, we'll have two properties – window, which will just point to the global object, and this, which will point to the
window object. So now, let's actually add some code to our program, so we can see how
the global execution context will change when we have some code.

```js
var name = "Satenik";
var age = 22;

function getUser(){
  return {
    name,
    age
  }
}
```

- Each execution context is going to have two phases
-  the Creation Phase and then, later on, 
- a phase that's the Execution Phase. 
So in the Creation Phase, what happens is you'll notice that we have our window object here.
We have that global object that's created for us. We also have the this object that's
created for us. And these two are going to happen no matter what, as we saw earlier when
we didn't have any code.
And then, the next thing that happens is all of the variable declarations are assigned
a value of "undefined," and the function declaration is put entirely into memory.

So in theCreation Phase of the global execution context, four things happen – we create a global object,we create an object called "this," we set up memory space for variables and functions,
and then we assign variable declarations a default value of "undefined," while placing
any functions directly in memory, as we see here. So then, when we take another step,
the Creation Phase is now over, and now it's time for the Execution Phase. This is the
phase where JavaScript starts executing your code line by line. So you'll see here, we
have a variable declaration. As we step through this, now, after Line 1 has run, in memory,
instead of name being undefined, name is now "Tyler." So we can keep doing this. Handle
is now going to be the string, "@tylermcginnis," and then our program is over because it has
finished executing.

So based on what you know about the global execution context and its two phases, the
Creation Phase, as well as the Execution Phase, what are we going to get in the console? Well,
if we run this, you'll notice that we get name is undefined, handle is also undefined,
and then getUser is just referencing the function in memory. 

- And again, the reason for that is because, as soon as we're in the Creation Phase, all of the variable declarations are assigned a default value of "undefined," and the function declaration is put into memory.
So then, when we enter the Execution Phase and we start running these lines, at this
moment, name is undefined, so we get "undefined." Handle is undefined, so we get "undefined."
And getUser is just sitting in memory because it's a function declaration, so we get the
function itself.
Now, this brings us to one of the very first topics that sometimes is seen as being a little
bit advanced. But now that we have a good understanding of the global execution context,
it's pretty straightforward.
- So remember when, during the Creation Phase of the execution context, we said that any variable declarations are assigned a default value of "undefined?"
Well, that term in JavaScript is called "hoisting."

- The thing that's confusing about hoisting is that nothing is actually hoisted or moved around. All hoisting is, is it's the process of assigning a variable declaration a default value of "undefined" during the Creation Phase.
That's really all it is. So at this point, you should be fairly comfortable with the
global execution context and its two phases – the Creation Phase, as well as the Execution
Phase.
### function execution context
- And the good news is there's only one other execution context you need to learn, and it's
almost exactly identical to the global execution context. And it's called the "function execution
context," and it's created whenever a function is invoked.

```js 
So this is important. The only time an execution context is created is, first, when the JavaScript engine starts interpreting your code, that's the global execution context, and then, after that, whenever a function is invoked.
```
#### difference

So now, the main thing we need to figure out is, what's the difference between the global execution context and the function execution context? 
So if you remember, we had a list of everything that the Creation Phase in the global execution context did.

It was this right here. We said, "It creates a global object, It creates an object called
"this," sets up memory space for variables and functions, and then it assigns variable
declarations a default value of "undefined," while placing any function declarations in
memory, a.k.a. "hoisting."

So can you think of anything on this list that makes sense for when the global execution
context is created, but doesn't necessarily make sense for when a function execution context
is created? It's probably this one right here. It makes sense to create a global object the
very first time the global execution context is created, which is only one time in your
entire program. But it doesn't make sense to make a global object whenever a function
is invoked. 

```js
So the only difference between the global execution context and a function
execution context is, instead of creating a global variable, a function execution context
is going to create an arguments object.
```
Right? Because when you invoke a function, that function
can receive any arguments. And if you're familiar with JavaScript, you'll know that we could
do something like this, where if we log "arguments," arguments is going to be an array-like object
inside of this function. So "arguments" is literally a keyword in JavaScript that is
an array-like object for all of the arguments that you are passing to the function.

So we can actually see this ourselves.
So notice, first, we're in the global execution context in the Creation Phase, so hoisting is happening here. We define, or we set all of those variable declarations to "undefined," and then we start executing the program as we saw earlier. 
But now, when we invoke this function, notice that we have a brand-new execution context here. And inside of that, before we ever start executing the code, a.k.a.

```js
//global ex context
// execution phase
// 1. window
//  2. this
var name = "Satenik";
var age = 22;

function getUser(){
  //global ex context
// execution phase
// 1. arguments object
//  2. this
  return {
    name,
    age
  }
}
getUser()
```

"when we are in the Creation Phase," we already have two things. We have an arguments object.
In this case, it's just empty, so it has a length of 0. And then we have a this object,
which in this case also points to the window.

So just as we saw in the Creation Phase of the global execution context, two things were
created for us.
Except this time, instead of a window object, we have an
- arguments object,
- and then we still have this. 
And because getUser doesn't have any variables, the JavaScript engine doesn't need to set up any memory space or hoist any of those variable declarations.

```js 
So once we finish stepping through this, you'll also notice that after getUser is finished
executing, notice it's removed from the UI over here. And this brings us to the topic
of an execution stack. So the way it works is any time a function is invoked, a new execution
context is created and added to the execution stack. Whenever a function is finished running
through both the Creation Phase and the Execution Phase, it gets popped off the execution stack
as we just barely saw.

```
Because JavaScript is single-threaded, meaning only one task
can be executed at a time, this is pretty simple to visualize.
So what I've done is created three different functions – a, b, and c. They're all nested
inside of one another. So first, we are on the global execution context, and then we
go into the execution context of the a function. Let's open up the console here, so that we
can see this as well. So then, 'In fn a' is going to be logged. And then, when b is invoked,
we get a new execution context on the execution stack. It'll log 'In fn b'. Then, when c is
invoked, we get another one. So now, we're in function c. And then, once c is finished
executing, the execution context is removed from the execution stack. Same thing for b,
and then same thing for a. 
So at this point, we've seen how function invocations create their own execution context, which get placed on the execution stack. But what we haven't talked about yet is how local variables play into that.

So let's change up our code just a little bit so that our functions now have some local
variables. So here, our code is pretty much the same. But now, we have this local variable,
"twitterURL," inside of our getURL function that we just barely created. And so now, let's
see how JavaScript Visualizer is going to visualize this. So as we step through this,
notice the same thing – Creation Phase, global execution context, all of the variables
are undefined. And then, eventually, we get into the execution context of getURL. And
you'll notice in the Creation Phase of the getURL execution context, we have arguments,
which we've talked about. We have this, which we've also talked about. But now, "twitterURL,"
which is the local variable inside of the getURL function, is hoisted to a value, or
assigned a default value of "undefined," just as our variable declarations up here were
as well.
But one other thing is that you'll notice we passed in "handle" as an argument to getURL.
We can see that on the arguments object right here. Any time you pass a variable to a function,
that variable during the Creation Phase is going to be put on or put in the variable
environment of the current execution context. So by passing in a variable called "handle,"
it's as if we created a local variable called "handle" here and set it equal to whatever
it was. In this case, it was "@tylermcginnis."
So we can visualize that nicely here, because
we have arguments, this, any arguments we passed in are now kind of like local variables,
and then we have…Because hoisting any variable declarations inside the function are assigned
a default value of "undefined."
So now, once we go into the Execution Phase, "twitterURL" becomes that URL, and then we
return "twitterURL + handle." And then, getURL gets popped off the execution stack, and then
our program is finished executing. 
#### Scope
This brings us to the topic called "scope."
In the past,you probably heard a definition of "scope" along the lines of "where variables are accessible."
Now, regardless of whether or not that actually made sense at the time, with your newfound
knowledge of execution context and our JavaScript Visualizer tool, hopefully, scopes will make
a lot more sense. So if we look at the definition of "scope" on MDN, you'll notice that it says,
"The current context of execution." That should sound familiar. We can think of scope, or
where variables are accessible, in a very similar way to how we've been thinking about
execution context.
So here's a test for you. Let's say I had a function called "foo" inside of here, we
had a local variable called "bar," and then I invoked foo and then did console.log(bar).
What is going to be logged to the console when this runs? Well, let's look. So we step
in, create a new execution context for foo. That creates a new variable called "bar."
But then, once the execution context is popped off the stack, when we go to console.log(bar),
looking at JavaScript Visualizer, it makes a lot of sense that we are going to get "ReferenceError:
bar is not defined." By the time this line runs, foo's execution context where "bar"
is defined has already been popped off the stack. So it's as if "bar" was never even
a thing because foo's execution context is already gone.
So let's look at another example here. So before we run this, let's walk through it.
We have a function called "first," where we define a name, "Jordyn," and then console.log
it. Second does the exact same thing with "Jake." We console.log(name) here, set a local
variable or, in this case, it's a global variable, name to "Tyler," call "first," call "second,"
and then console.log(name). So go ahead and hit Pause on this video right now. Walk through
this, and then think about what's going to be logged to the console. So first, we enter
the global execution context in the Creation Phase. The variable declarations are put into
memory, and the name variable is assigned a default value of "undefined."
So then, when we get to this line right here, "console.log(name)," what's gonna happen is,
at this moment, name is undefined, as we can see, so we get "undefined." We then set name
to "Tyler," and then we enter the first execution context, or we create a new execution context
called "first." In the Creation Phase, we have arguments, this, and then a name which
is default as "undefined." We assign name to "Jordyn." And then, when we console.log,
we get "name." So the way this works, and this might be obvious, is when you try to
access a variable in an execution context, it's first going to look to its own execution
context to see if that variable exists. In this case, it does. So it just logs "Jordyn."
So then, first is taken off the execution stack. Then, we go into second, same thing,
name gets set to "Jake." And then, same logic, because name is in the current context, it's
going to log "Jake." And then, at this moment, we console.log(name), and there is a name
variable here in the global execution context variable environment, so we get "Tyler." So
now, what if the variable doesn't exist in the current execution context? Will the JavaScript
engine just stop trying to look for that variable? So let's see an example here. So let's set
name to "Tyler." We can log the name, and then we invoke logName. So we have a variable
named "Tyler." We go into the logName execution context. At this moment, logName doesn't have
a local variable called "Name."
So what it's going to do is it's going to look to its closest parent execution context
to see if a name property exists. So what will happen is it'll say, "Hey, I don't have
'name,' but it looks like the execution context above me does. So go ahead and log that instead."
And this is really the idea of scopes and scope chains in JavaScript. So if the JavaScript
engine, like I said, can't find a variable local to the function's execution context,
as we saw here, it'll look to the nearest parent execution context for that variable.
That lookup process will continue all the way up, until the engine reaches the global
execution context. In that case, if the global execution context doesn't have the variable,
then it'll just throw a ReferenceError, as we saw earlier, because that variable doesn't
exist anywhere up the scope chain, or the execution context chain.
So at this point, we've talked about execution contexts and their phases – the Creation
Phase, as well as the Execution Phase. We've talked about hoisting, we've talked about
scopes, and we've talked about the scope chain lookup. There's one last topic I want to discuss
and, historically in JavaScript, it's taken as a very advanced topic. But I'm hoping now
with your knowledge of all of the topics that we just barely covered, it should be pretty
straightforward. So what we're going to do is we're going to visualize this code right
here. So notice, we have a count. We have a makeAdder function, which takes in a single
argument, and what it returns is a new function that takes in a single argument. And then,
when this inner function is invoked, it's going to return us whatever the initial argument
was, plus whatever the new argument was.
So what this looks like…And again, your brain might be getting a little weird right
now. We'll walk through this. So what happens is makeAdder returns us a function, so add5
is going to be a function. So then we say, "count += add5(2)," which will give us "5"
because that was the initial argument plus 2. All right. That was a lot. Let's visualize
this, so we can see what happens. So we are in the Creation Phase. We define some variables,
and then we enter makeAdder's execution context. At this moment, in the Creation Phase, we
have arguments, this, then we have a local variable because that's what was passed in
as an argument. So we enter the Execution Phase, and then makeAdder is going to be removed
from the execution stack because it is going to be finished executing.
But notice what happens here. We have this brand-new thing called a "closure scope."
The reason we have this is because we had a function nested inside of another function.
And whenever that happens, the inner function is going to create what's called a "closure"
over the outer function's execution context. So you'll notice here that the variables inside
of this closure execution context are the exact same as the variables that were in the
makeAdder execution context. Again, the reason for that is because, later on when inner is
invoked, it needs to have access to those same variables, that same variable environment.
If it's still fuzzy, let's continue to step through this.
So eventually, what happens is we invoke add5. That creates a new execution context on the
execution stack, and then let's just read this as normal. So as we're executing, we
get to this line right here, where we are returning "x + y." JavaScript is going to
say, "Okay. Does inner have a y variable in its variable environment?" It does. It's set
to "2," but we also need to know what x is. Does inner have an x variable in its variable
environment? It doesn't. So just as we've done in the past, we want to look up to the
closest parent execution context to see if that variable exists. We look up in the closure
scope and it says, "Hey, does closure scope have a variable in its variable environment
of x?" It does, and it's value is "5." So go ahead and return "5 + 2." So then, we continue
stepping through this. And then, count gets changed to "7" because, as we saw, that was
5 + 2, and then the closure scope is removed from the execution stack.
So let's visualize this just one more time. The takeaway here is, if you have a function
inside of another function, as we do right here – we have inner inside of makeAdder
– the inner function is going to create what's called a "closure" over the execution
context variable environment of the parent function. So in this case, even though the
makeAdder execution context gets removed from the stack, because we have these nested functions,
inner creates what's called a "closure scope" over, again, the execution context variable
environment of the parent function. So now, later on, when that inner function is invoked,
as we see here, with the normal scope chain lookup rules, the inner function has access
to any of the variables declared in the parent function's execution context, even though
that parent function's execution context has been removed from the stack. And that whole
concept, as you probably guessed by now, is called a "closure.
So one last time, let's go ahead and do a real quick recap. When the JavaScript program
starts to run, it creates a global execution context. This execution context has two phases.
The Creation Phase – in the Creation Phase, four different things happen. First, in the
global execution context, JavaScript will create a global object. We will always create
a this object. We set aside memory space for any variables, as well as functions. Variable
declarations get assigned a default value of "undefined," that's called "hoisting,"
and functions themselves get placed entirely into memory. The next type of execution context
is the function execution context, which will happen whenever a function is invoked, as
we see here. So the function execution context is the exact same as the global execution
context. Except for instead of creating a global object, we create an arguments object,
and any arguments that are passed into that function get added as if they were just local
variables to the execution context.
Then, whenever you have a function inside of another function, even if the parent function's
execution context is removed from the stack, the inner function will still retain access
to the variable environment of the parent function's execution context. This is called
a "closure" that we can see here. And then, the last thing is the scope chain. At this
moment, right here, JavaScript is going to look inside of the current execution context
to see if the variable "x" exists. It doesn't, so then it will go up the scope chain to the
next closest parent execution context. In this case, it's the closure scope. It will
look for that variable. In this case, it exists. It's "5." So then, x will become "5." Y exists
locally in the execution context, so y will be "2." So that will return "7," which gets
added to count, which then changes to "7."