const sortArrayByParity = function (nums = [14, 6, 7, 83]) {
  const evens = [];
  const odds = [];
  nums
    .sort((a, b) => a - b)
    .forEach((el) => {
      el % 2 === 0 ? evens.push(el) : odds.push(el);
    });
  evens.push(...odds);
  return evens;
};

console.log(sortArrayByParity());

const sortArrayByParity1 = function (nums = [14, 6, 7, 83]) {
  const result = [];
  nums
    .sort((a, b) => a - b)
    .forEach((el) => {
      el % 2 === 0 ? result.push(el) : result.unshift(el);
    });
  return evens;
};

console.log(sortArrayByParity1());

const sortArrayByParity2 = function (nums) {
  let oddIdx = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      [nums[i], nums[oddIdx]] = [nums[oddIdx], nums[i]];
      oddIdx++;
    }
  }

  return nums;
};

console.log(sortArrayByParity2([14, 6, 7, 83]));
