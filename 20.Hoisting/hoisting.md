## Under the hood

Hoisting place things made-up it's not real, it doesn't exist, if you look at the spec, there's no existence of the word hoisted because it's not a real thing, it's actually a metaphor for describing how the compiler works.

Variables declared with var become properties of global object(window), but let and const don't become properties of window object.
Variables with let and const are hoisted and stored in temporary dead zone but they are not initialized, they're not accessible rather than it is defined. In execution phase will be assigned undefined and then value to the variables declared with let and const.
