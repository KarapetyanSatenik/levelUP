The new.target meta-property lets you detect whether a function or constructor was called using the new operator. In constructors and functions invoked using the new operator, new.target returns a reference to the constructor or function that new was called upon. In normal function calls, new.target is undefined.

```js
function Foo() {
  if (!new.target) { throw new TypeError('calling Foo constructor without new is invalid'); }
}

try {
  Foo();
} catch (e) {
  console.log(e);
  // Expected output: TypeError: calling Foo constructor without new is invalid
}

```