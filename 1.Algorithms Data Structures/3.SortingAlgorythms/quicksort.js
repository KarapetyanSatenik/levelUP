function quickSort(arr) {
  if (arr.length <= 1) {
      return arr;
  }
  
  // Choose a pivot element (e.g., the last element)
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  // Partition the array into two sub-arrays around the pivot
  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
          left.push(arr[i]);
      } else {
          right.push(arr[i]);
      }
  }
  
  // Recursively sort the left and right sub-arrays and concatenate them with the pivot
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage:
const myArray = [4, 2, 7, 1, 3];
console.log(quickSort(myArray)); // Output: [1, 2, 3, 4, 7]
