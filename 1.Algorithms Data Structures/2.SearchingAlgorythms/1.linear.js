// here Big O is linear time complexity.
function myLinear(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return i;
    }
  }
  return -1;
}

console.log(myLinear([4, 3, 1, 6, 7, 9], 7));
