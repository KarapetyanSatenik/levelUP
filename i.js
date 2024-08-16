const a = new Promise((r, j) => {
  r(3);
});

const b = Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]);

b.then((a) => {
  console.log(a);
});
