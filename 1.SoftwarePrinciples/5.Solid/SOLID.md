
# S.O.L.I.D

If you are familiar with Object-Oriented Programming, then you’ve probably heard about the SOLID principles.

These five software development principles are guidelines to follow when building software so that it is easier to scale and maintain. They were made popular by a software engineer, Robert C. Martin.
You see, some of these principles may look similar but they are not targeting the same goal. It is possible to satisfy one principle while violating the other, even though they are alike.

### S  Single Responsibility
A class should have a single responsibility

If a Class has many responsibilities, it increases the possibility of bugs because making changes to one of its responsibilities, could affect the other ones without you knowing.

- Goal

This principle aims to separate behaviors so that if bugs arise as a result of your change, it won’t affect other unrelated behaviors.

### O  Open-Closed
This principle suggests that “classes should be open for extension but closed for modification”. What is means is that if the class A is written by the developer AA, and if the developer BB wants some modification on that then developer BB should be easily do that by extending class A, but not by modifying class A.

The easy example would be the RecyclerView.Adapter class. Developers can easily extend this class and create their own custom adapter with custom behavior without modifying the existing RecyclerView.Adapter class.

Changing the current behavior of a Class will affect all the systems using that Class.

If you want the Class to perform more functions, the ideal approach is to add to the functions that already exist NOT change them.

- Goal

This principle aims to extend a Class’s behavior without changing the existing behavior of that Class(which means you should be able to extend a class behavior, without modifying it). This is to avoid causing bugs wherever the Class is being used.

### Liskov Substitution

Simply put, the Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application. 
If S is a subtype of T, then objects of type T in a program may be replaced with objects of type S without altering any of the desirable properties of that program.

When a child Class cannot perform the same actions as its parent Class, this can cause bugs.

If you have a Class and create another Class from it, it becomes a parent and the new Class becomes a child. The child Class should be able to do everything the parent Class can do. This process is called Inheritance.

The child Class should be able to process the same requests and deliver the same result as the parent Class or it could deliver a result that is of the same type.

If the child Class doesn’t meet these requirements, it means the child Class is changed completely and violates this principle.

- Goal

This principle aims to enforce consistency so that the parent Class or its child Class can be used in the same way without any errors.

### I — Interface Segregation

Clients should not be forced to depend on methods that they do not use.

When a Class is required to perform actions that are not useful, it is wasteful and may produce unexpected bugs if the Class does not have the ability to perform those actions.

A Class should perform only actions that are needed to fulfil its role. Any other action should be removed completely or moved somewhere else if it might be used by another Class in the future.

- Goal

This principle aims at splitting a set of actions into smaller sets so that a Class executes ONLY the set of actions it requires.


### D — Dependency Inversion

- High-level modules should not depend on low-level modules. Both should depend on the abstraction.

- Abstractions should not depend on details. Details should depend on abstractions.

Firstly, let’s define the terms used here more simply

High-level Module(or Class): Class that executes an action with a tool.

Low-level Module (or Class): The tool that is needed to execute the action

Abstraction: Represents an interface that connects the two Classes.

Details: How the tool works

This principle says a Class should not be fused with the tool it uses to execute an action. Rather, it should be fused to the interface that will allow the tool to connect to the Class.

It also says that both the Class and the interface should not know how the tool works. However, the tool needs to meet the specification of the interface.

Goal

This principle aims at reducing the dependency of a high-level Class on the low-level Class by introducing an interface.

## Conclusion

SOLID design principles increases maintainability, scalability, reusability and testability. These principles are global and apply everywhere.

Implementing SOLID design principles during development will lead to systems that are more maintainable, scalable, testable, and reusable. In the current environment, these principles are used globally by engineers. We can use these principles to create beautiful projects that are understandable to industry standards.