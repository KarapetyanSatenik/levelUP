function insertionSort(arr) {
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        var key = arr[i];
        var j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Example usage:
var myArray = [4, 2, 7, 1, 3];
console.log(insertionSort(myArray)); // Output: [1, 2, 3, 4, 7]
