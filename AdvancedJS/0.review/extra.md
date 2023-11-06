Сравнение Object.is
Существует специальный метод Object.is, который сравнивает значения примерно как ===, но более надёжен в двух особых ситуациях:

Работает с NaN: Object.is(NaN, NaN) === true, здесь он хорош.
Значения 0 и -0 разные: Object.is(0, -0) === false, это редко используется, но технически эти значения разные.
Во всех других случаях Object.is(a, b) идентичен a === b.

Этот способ сравнения часто используется в спецификации JavaScript. Когда внутреннему алгоритму необходимо сравнить 2 значения на предмет точного совпадения, он использует Object.is (Определение SameValue).


14. All object have prototypes.
A: true
B: false
Answer
Answer: B
All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.

- It's important to remember that arrow functions remember the environment where they have been created, that's why in this case THIS inside of arrow function doesn't refer to its outer function, in this case it doesn't matter where it will be called, is important where it has been created. 
```js
const getFullName = () => {
  return this.name;
};

const obj = {
  name: "Satenik",
  obj1: {
    name: "Sofia",
  },
  fullName(){
    return getFullName()
  },
};

console.log(obj.fullName.call(obj.obj1));
```

- like bind() method in case of call and apply the returned function remember its THIS also. 
```js
function foo() {
  return (a) => {
    return this.a;
  };
}
const obj1 = { a: 2 };
const obj2 = { a: 3 };
const bar = foo.call(obj1);
console.log(bar());

```


## Var

