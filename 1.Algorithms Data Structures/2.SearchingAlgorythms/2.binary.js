// Binary search works only on sorted array

function myBinary(arr, n) {
  if (!arr.length) return -1;
  const newArr = arr;
  newArr.sort((a, b) => a - b);

  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (n === arr[middleIndex]) {
      return middleIndex;
    }
    if (n < middleIndex) {
      rightIndex = middleIndex - 1;
    } else {
      leftIndex = middleIndex + 1;
    }
  }
  return -1;
}

console.log(myBinary([1,2,3,4,5,6], 7));

// time complexity is O(logn)
// Big O = O(logn)