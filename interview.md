## primitive

```js
let str = "Hello";
str.test = 5; // (*)
alert(str.test);
```

Depending on whether you have use strict or not, the result may be:

undefined (no strict mode)
An error (strict mode).
Why? Let’s replay what’s happening at line (\*):

When a property of str is accessed, a “wrapper object” is created.
In strict mode, writing into it is an error.
Otherwise, the operation with the property is carried on, the object gets the test property, but after that the “wrapper object” disappears, so in the last line str has no trace of the property.
This example clearly shows that primitives are not objects.

They can’t store additional data.

## MAP

map[key] isn’t the right way to use a Map

Although map[key] also works, e.g. we can set map[key] = 2, this is treating map as a plain JavaScript object,
To test keys for equivalence, Map uses the algorithm SameValueZero. It is roughly the same as strict equality ===, but the difference is that NaN is considered equal to NaN. So NaN can be used as the key as well.

Every map.set call returns the map itself, so we can “chain” the calls:

```js
map.set("1", "str1").set(1, "num1").set(true, "bool1");
```

The iteration goes in the same order as the values were inserted. Map preserves this order, unlike a regular Object.

## statically Dynamic

The main thing of statically typed languages is that you're going to get less bugs in production because this will never make it into production.

- Static types usually prevent bugs and help keep errors from happening.
- Dynamic typing allows you to be more flexible and write software faster.
- TypeScript allows us to make JavaScript to behave like a statically typed language.

here's actually many ways that we can introduce static typing to JavaScript. There's tools like flow, Elm, Reason ML and obviously TypeScript. For example, reason ML and flow were created by Facebook and the developers of Facebook and TypeScript by the developers of Microsoft.
They all try and make JavaScript a statically typed language.

# Promise

## all

- Promise.all takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

## allSettled

- Promise.allSettled just waits for all promises to settle, regardless of the result. The resulting array has:

{status:"fulfilled", value:result} for successful responses,
{status:"rejected", reason:error} for errors.

## race

Similar to Promise.all, but waits only for the first settled promise and gets its result (or error).

## any

Similar to Promise.race, but waits only for the first fulfilled promise and gets its result

## async await

```js
console.log(1);
async function a() {
  console.log(3);
  return 45;
}
a().then(console.log);
console.log(4);
```

async function works synchronous way, jut returned item will be handled async way

## classes

classes can inherits from classes or functions

this is a way how to make property only read only

```js
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (no setter)
```

## typescript

TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors early in the development process and provides better tooling support. TypeScript code is transpiled to JavaScript, which can then be run in any JavaScript environment.

- The benefits of using TypeScript include early detection of errors through static typing, prevent code from errors and bugs.

## Interface

- Interfaces in TypeScript define the shape of an object.

In TypeScript, both abstract classes and interfaces are used to define the structure of objects
An abstract class is a base class that cannot be instantiated on its own and must be inherited by other classes.
It can include implementation details for its members.

An interface is a structure that defines the contract in your application. It cannot have any implementation details; it can only provide the signatures of the functionality the classes should have.
They are used to define properties, methods, and event declarations without implementing them.

## Generics

Generics in TypeScript allow you to create reusable and type-safe components. They enable you to write a component that can work with any data type. they are very powerful tools to give static typing to a dynamic type.

## SQS and SNS

SQS Messages are sent to a queue and processed by consumers that pull messages from the queue. Subscribers receive messages via push mechanism, meaning messages are pushed to subscribers as they are published.

## Monolithic Architecture

In a Monolithic Architecture, all components of the application are tightly integrated and deployed as a single service. This means that all components, including the database layer, client-side, server-side, and background processing, are part of a single codebase and operate under a single runtime environment.

Advantages:

- Simplicity: Easier to develop, test, deploy, and scale initially because everything is in one place.

- Development Speed: Faster in the early stages of a project since developers don't need to handle inter-service communications.

- Transactional Integrity: Easier to manage data consistency and implement transactions as all data handling is in one place.

Disadvantages:

- Scalability: As the application grows, scaling specific functionalities or services independently becomes challenging.
- Reliability: A bug in any module can potentially bring down the entire system.
  Development Speed: Over time, as the application grows, the codebase can become unwieldy, slowing down development cycles.

## Microservices Architecture

In a Microservices Architecture, the application is composed of small, independent services that communicate over well-defined APIs. Each service is responsible for a specific feature or functionality and can be developed, deployed, and scaled independently.

Advantages:

- Scalability: Easier to scale parts of the application independently as demand requires.

- Flexibility: Each service can be developed and deployed independently using the most suitable technology stack.

- Resilience: Failure in one service doesn’t necessarily bring down the entire system; other services can continue to function.

- Development Speed: Smaller codebases and teams focused on specific services can lead to faster development cycles.

Disadvantages:

- Complexity: Managing multiple services, inter-service communication, and data consistency can be complex.

- Operational Overhead: Requires robust infrastructure for deployment, monitoring, logging, and communication between services.

- Data Management: Implementing transactions across services can be challenging and might require complex coordination and agreement protocols.

Choosing Between Monolithic and Microservices

Startup Projects: Startups or small applications might benefit from a monolithic approach initially due to its simplicity and ease of deployment.

Large Scale Applications: For large-scale applications with complex requirements, or where different parts of the application are expected to scale differently, a microservices architecture might be more appropriate.

Organizational Structure: Companies with teams that can operate independently may find microservices beneficial as it aligns well with a decentralized governance model.
In summary, the choice between monolithic and microservices architectures depends on the specific needs, scale, and goals of the project, as well as the capability of the organization to manage the complexity of the chosen architecture.

## design patterns

Design patterns are typical solutions to common problems in software design. They are like templates that can be applied to real-world coding situations. These patterns are divided into three main categories:

- Creational Patterns: Focus on ways to create objects while hiding the creation logic, rather than instantiating objects directly. This gives the program more flexibility in deciding which objects need to be created for a given case.

Examples: Singleton, Factory, Builder.

- Structural Patterns: Deal with how objects and classes are composed, to form larger structures. These patterns help ensure that changing one part of a system doesn’t affect other parts.

Examples: Adapter, Decorator, Proxy.

- Behavioral Patterns: Concerned with communication between objects, these patterns improve the interaction and responsibilities among objects, making the interaction more flexible and efficient.

Examples: Observer, Strategy, Command.

In essence, design patterns help you write code in a cleaner and more efficient way, solving common problems with proven method

Polymorphism
param/method overriding - child overrides parent method
. One is the method and parameter overriding, where the child overrides a parent method.

2. method overloading - same name methods, js doesn't supprt this
   Polymorphism - TypeScript: Object-Oriented Programming Video Tutorial | LinkedIn Learning, formerly Lynda.com
   Polymorphism is one of those big CS-heavy words most people don't know. You actually have already covered it without you knowing.

Private means it's quite literally only accessible in the class itself. It doesn't matter if it's a child.

class User {
private age:number
constructor(age) {
this.age = age;
}

getAge() {
return this.age;
}
}

}

Public vs. private - TypeScript: Object-Oriented Programming Video Tutorial | LinkedIn Learning, formerly Lynda.com
In this video, dive deep into how you can protect your objects with the private keyword and open up and make them accessible with the public keyword.

if we have protected method in one class we can't write implements in another class


# Databases

## Join

With the help of join we can select multiple fields from different tables.
But here we can join not only tables from the same db but also from different tables.

### Self Join

Also we can join table with itself but here using aliases is important otherwise it won't work.

```js
SELECT * FROM employees e JOIN employees m ON e.reports_to = m.employee_id
```

### Multiple join

We can join not only two tables but also 3 and more

### Compound Join

Table can have two primary key which is called composite primary key.
composite primary key contains more tan one column.
And in case of compound join we use multiple conditions

### Implicit join syntax which is not a good practice to use

### Cross join where every record is joined with every record in the same table

### Inner Join by default

in case of inner join you will see only records where you found match, for example if you want to join customer table to order table, in case of inner join you will se only the customers who have orders, but you won't see the customers who don't have orders, that's why we need to use outer join to see all the customers.

### Outer Join

And here we have left join and right join
in case of left join all records will be returned from left table

```js
SELECT * 
FROM customers c
LEFT JOIN order o
    ON c.customer_id = o.customer_id
```

but in case of right join the customers who don't have orders will not be returned, because we entered right join, which means all records should be returned from order table

```js
SELECT * 
FROM customers c
RIGHT JOIN order o
    ON c.customer_id = o.customer_id
```

but if you want to see all the orders, you need to swap table places


### We can use outer join for multiple tables 
### also self outer join

```js
SELECT * 
FROM employees e 
LEFT JOIN employees m 
    ON e.reports_to = m.employee_id
```



