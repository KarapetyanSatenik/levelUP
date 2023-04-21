function foo(arr) {
  let max = 0;
  let index;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
      index = i;
    }
  }

  return { [index]: max };
}

console.log(foo([1, 2, 3, 4, 5, 2, 3, 6, 7, 9, 32, 45, 34]));
