// Big O is linear time complexity
// if value of n increases the time complexity also increases
// here the big O is O(logn) because the input size is reduced by half
function myFactorial(n) {
  if (n === 0) return 1;
  let sum = 1;
  for (let i = 2; i <= n; i++) {
    sum *= i;
  }
  return sum;
}

console.log(myFactorial(4));

