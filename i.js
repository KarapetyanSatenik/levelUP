// const a = Promise.all([Promise.resolve(3), Promise.resolve(4)]);

// console.log(a);
// a.then(console.log);

class Person {
  constructor() {
    this.a = 45;
    console.log(45);
  }
}

console.log(new Person.constructor());
