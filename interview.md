## MAP
map[key] isn’t the right way to use a Map

Although map[key] also works, e.g. we can set map[key] = 2, this is treating map as a plain JavaScript object, 
To test keys for equivalence, Map uses the algorithm SameValueZero. It is roughly the same as strict equality ===, but the difference is that NaN is considered equal to NaN. So NaN can be used as the key as well.

Every map.set call returns the map itself, so we can “chain” the calls:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.


## statically  Dynamic

The main thing of statically typed languages is that you're going to get less bugs in production because this will never make it into production.

- Static types usually prevent bugs and help keep errors from happening.
- Dynamic typing allows you to be more flexible and write software faster.
- TypeScript allows us to make JavaScript to behave like a statically typed language.

here's actually many ways that we can introduce static typing to JavaScript. There's tools like flow, Elm, Reason ML and obviously TypeScript. For example, reason ML and flow were created by Facebook and the developers of Facebook and TypeScript by the developers of Microsoft.
They all try and make JavaScript a statically typed language.

# Promise

## all
- Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

## allSettled
- Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:

{status:"fulfilled", value:result} for successful responses,
{status:"rejected", reason:error} for errors.

## race

Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

## any
Similar to Promise.race, but waits only for the first fulfilled promise and gets its result

## async await

```js
console.log(1);
async function a() {
  console.log(3);
  return 45;
}
a().then(console.log);
console.log(4);
```

async function works synchrounous way, jut returned item will be handled async way