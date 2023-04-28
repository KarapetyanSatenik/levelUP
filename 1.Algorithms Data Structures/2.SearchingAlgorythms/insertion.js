// 1.  virtually split the array into a sorted and an unsorted part
// 2. Assume that the first element is sorted and remaining elements are unsorted
// 3. select an unsorted element and compare with all the elements in the sorted part
// 4. if the elements in the sorted part is smaller than the selected element proceed to the 
// next element in the unsorted part else shift larger elements in the sorted part towards the right
// 5. insert the selected element at the right index ensuring the sorted part remains that way


const insertionSort = array => {
    const arr = Array.from(array); // avoid side effects
    for (let i = 1; i < arr.length; i++) {
      for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
    return arr;
  };
  
  console.log(insertionSort([4, 9, 2, 1, 5]));