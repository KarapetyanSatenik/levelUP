## First-class functions

JavaScript, for all of its power and expressiveness, is a language that refuses categorization. Some prefer to use it in the object-oriented style and others in the functional style. And the mere fact that it can be used in either tells us something about JavaScript’s dynamism. JavaScript is a flexible language that provides a wealth of features that, if well understood, can be leveraged in powerful ways.

One of the most dynamic features of JavaScript is that it has first-class functions, meaning that functions are treated like any other first-class object(что с функциями обращаются как с любыми другими объектами первого класса) — they can be stored in variables, passed around, returned from other functions, and even hold their own properties. For the JavaScript programmer this means that you can take advantage of powerful design patterns such as higher-order functions, partial function application, callbacks, and more. First-class functions are a vital part of the JavaScript landscape, so, let’s take a closer look and see what they’re all about.


A first-class object, sometimes referred to as a first-class citizen, is an object that supports all of the operations generally allowed to other objects. In fact, JavaScript functions are themselves types of objects. A first-class function can thus be expected to support the same operations we would expect from other objects. So what are these operations? Generally, first-class objects can:

Be stored in a variable;
Be passed as arguments to functions;
Be returned by functions;
Be stored in some data structure; and,
Hold their own properties and methods.

```js
// Function definition and invocation
function speak(string) {
  console.log(string);
}
speak("Hello");                     // logs "Hello"

// Store in a variable
var talk = speak;
talk("Hi");                         // logs "Hi"

// Pass as an argument to a function
// Return from a function
function functionReturner(fn) {
  return fn;
}
var chat = functionReturner(talk);
chat("Good Morning");               // logs "Good Morning"

// Store in a data structure
var myFuncs = [talk];
myFuncs[0]("Good Afternoon");       // logs "Good Afternoon"

// Owns properties
talk.myProperty = "bananas";
console.log(talk.myProperty); 
```

## Higher-Order Functions

Higher-Order Functions

A higher order function is a function that takes a function as an argument(s) and/ or returns a function.
In other words, higher-order functions do work on other functions. The classic example of higher-order functions are built-in functions that we use every day to manipulate JavaScript objects and data structures. JavaScript has a lot of useful native higher order functions that you can use: map, filter, sort, reduce and bind are a few. These built-in functions do some kind of work such as iteration or transformation. Often, we supply such built-in functions with anonymous functions as callback arguments, but we can also pass in existing functions. Consider the following:

```js
var myNums = [1, 2, 3, 4, 5];

function doubleNum(num) {
  return num * 2;
}

// Built-in Array.prototype.map function, using anonymous function argument
var doubledNums = myNums.map(function(num) {
  return num * 2;
});
console.log(doubledNums);           // logs "[2, 4, 6, 8, 10]"

// Built-in Array.prototype.map function, using named callback argument
var otherDoubledNums = myNums.map(doubleNum);
console.log(otherDoubledNums);      // logs "[2, 4, 6, 8, 10]"
```

## Partial Function Application

Of course, we don’t have to rely on built-in JavaScript higher-order functions. We can also write our own! One of the most powerful patterns for this is the idea of partial function application. In this pattern, we write a function that accepts another function as a parameter. The function then returns a new function that has the same functionality as the one we provided as an argument but with some value pre-applied to it. This can be a somewhat tricky idea to get your head around, so let’s check it out in the code.

```js
function applicator(fn, val) {
  return function() {
    fn(val);
  };
}

function speak(string) {
  console.log(string);
}

var sayHello = applicator(speak, "Hello");
sayHello();                         // logs "Hello";
```