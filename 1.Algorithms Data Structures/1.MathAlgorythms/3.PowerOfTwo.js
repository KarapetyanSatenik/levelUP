// if reminder is not 0 in any step, n is not a power of two
// n = 8
// 8/2 = 4 reminder 0
// 4/2 = 2 reminder 0
// 2/2 = 1 reminder 0


function isPowerOfTwo(n) {
  // n should be positive integer
  if (n < 1) return false;
  while (n > 1) {
    if (n % 2 !== 0) {
      return false;
    }
    n = n / 2;
  }
  return true;
}

console.log(isPowerOfTwo(5));
