A pure function is a function which:

Given the same input, always returns the same output. Produces no side effects.

## Mapping
Pure functions are all about mapping. Functions map input arguments to return values, meaning that for each set of inputs, there exists an output. A function will take the inputs and return the corresponding output.

`Math.max()` takes numbers as arguments and returns the largest number:
```js
Math.max(2, 8, 5); // 8
```

In this example, 2, 8, & 5 are arguments. They’re values passed into the function.

`Math.max()` is a function that takes any number of arguments and returns the largest argument value. In this case, the largest number we passed in was 8, and that’s the number that got returned.

Meaning, if it is practical to implement a program requirement using pure functions, you should use them over other options.
Pure functions take some input and return some output based on that input. They are the simplest reusable building blocks of code in a program. Perhaps the most important design principle in computer science is KISS (Keep It Simple, Stupid). I prefer Keep It Stupid Simple. Pure functions are stupid simple in the best possible way.

### Given the Same Input, Always Return the Same Output

```js
const double = x => x * 2;

console.log( double(5) ); // 10
```
With our `double()` function, you can replace the function call with the result, and the program will mean the same thing — `double(5)` will always mean the same thing as `10` in your program, regardless of context, no matter how many times you call it or when.
console.log is pure function.

But you can’t say the same thing about all functions. Some functions rely on information other than the arguments you pass in to produce results.

Consider this example:
```js
Math.random(); // => 0.4011148700956255
Math.random(); // => 0.8533405303023756
Math.random(); // => 0.3550692005082965
```
Even though we didn’t pass any arguments into any of the function calls, they all produced different output, meaning that `Math.random()` is not pure.

### A function is only pure if, given the same input, it will always produce the same output. 

For example, the following function is pure:
```js
const highpass = (cutoff, value) => value >= cutoff;
```

The same input values will always map to the same output value:
```js
highpass(5, 5); // => true
highpass(5, 5); // => true
highpass(5, 5); // => true
```
Many input values may map to the same output value:
```js
highpass(5, 123); // true
highpass(5, 6);   // true
highpass(5, 18);  // true
highpass(5, 1);   // false
highpass(5, 3);   // false
highpass(5, 4);   // false
```
A pure function must not rely on any external mutable state, because it would no longer be deterministic or referentially transparent.

### Pure Functions Produce No Side Effects
A pure function produces no side effects, which means that it can’t alter any external state.

### Immutability

JavaScript’s object arguments are references, which means that if a function were to mutate a property on an object or array parameter, that would mutate state that is accessible outside the function. Pure functions must not mutate external state.
The problem with this is that we’ve just mutated some shared state. Other functions may be relying on that cart object state to be what it was before the function was called, and now that we’ve mutated that shared state, we have to worry about what impact it will have on the program logic if we change the order in which functions have been called. Refactoring the code could result in bugs popping up, which could screw up orders, and result in unhappy customers.