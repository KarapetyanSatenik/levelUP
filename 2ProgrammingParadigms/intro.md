Hundreds of programming languages are currently used in the IT industry. Each one serves a specific purpose and has its own characteristics. In this lesson, you will learn how to classify languages based on the programming paradigm (object-oriented, procedural, or functional), conversion type (interpreted or compiled), and typing style (static or dynamic and strong or weak).


## Level of Abstraction

1. Low-level languages send direct calls to the OS and are represented in 0 or 1 forms. They have little to no abstraction. Low-level programs work fast and consume very little memory.

Examples of low-level languages:
- Machine code
- Assembler


2. High-level languages send indirect calls to the OS using abstraction level. Such programs don't depend on hardware and require a compiler or interpreter to translate them to the OS.

Examples of high-level languages:
- Python
- Java
- Ruby
- JavaScript

## Programming Paradigm
Some languages are better suited for a specific way of programming than others.

There are two main programming paradigms: declarative and imperative. These terms don't refer to specific languages but to the programming styles they employ.

1. Declarative paradigm
Declarative languages describe the intended result of a program without specifying how to achieve it. You can use a language's features, extensions, or libraries to do this.

Suppose you want a pizza. According to the declarative paradigm, you describe what kind of pizza you want— pepperoni—but not how it is prepared. It can be ordered from a restaurant or cooked in a kitchen. The process doesn't matter to you.

Examples of declarative languages:
- HTML—You don't need to know how a browser renders HTML. You describe the structure of the webpage.
- SQL—You don't need to know how queries work. You just describe the result.

2. Imperative paradigm
The main goal of imperative programming is to describe the process of achieving a result. An imperative language describes how to execute a program command by command.

Returning to the pizza analogy, this time, you need to describe the process:
Make dough → Add pepperoni → Add tomatoes → Bake pizza

Examples of imperative languages:
- Python
- Java
- Ruby
- JavaScript


##  functional paradigm
The functional paradigm is an example of declarative programming in which programs are executed as a chain of function calls. Such a chain forms a recursion: Functions accept inputs and return outputs that can be used as input by the consecutive functions.

You can apply standard functions or define new ones. What's more, functional programs don't have a state. Therefore, the data doesn't change; it just gets copied.

Advantages:
- It is easier to understand, test, debug, and support code because the program doesn't have a state. Functions depend only on input data.
- Functions can take other functions as arguments and return functions as a result.
- This enables parallel execution of the same functions because they don't have a state.

Disadvantages:
- Recursion depth is limited in some languages.
- Code readability can be affected.
- Immutability of the values can cause problems with performance since you have to copy the values every time.

Examples of functional languages:
- Erlang
- Haskell
- F#
- Wolfram Language

##  object-oriented
An object-oriented paradigm is a form of imperative programming. According to this paradigm, a program interacts with a set of objects instantiated from classes. Classes have attributes (data stored in classes) and methods (code to manage the data).

For example, a program has a car class that serves as a template for other car objects within the program. The program should first instantiate it from the class to interact with the object. Objects inherit methods and attributes: New cars can drive and change speed and have the same color as their parental class. At the same time, the car objects have a unique state (color and maxspeed).

Advantages:
- Parallel development. Each team member can work independently with their own module/classes.
- Scalable. Very often, classes can be reused.
- Maintainable. The coding base is centralized, so it is easier to create maintainable code. That makes it easier to keep your data accessible when it becomes necessary to perform an upgrade.

Disadvantages:
- Can be inefficient. Using an OOP can increase CPU usage.
- Unnecessary classes. An insufficiently well-designed and thought-out inheritance structure can lead to quite a large number of unnecessary classes.
- Duplication. OOP projects are quite easy to develop but sometimes quite difficult to implement. You can get up new projects and run them at a greater speed. But sometimes projects look like they've been cloned.

Examples of object-oriented languages:
- Python
- Ruby
- C++

## Compilation
Compilation is the process of translating source code from high-level programming language to lower-level language (e.g., assembly code, object code, or machine code) to create an executable program ("Compiler" (2022) Wikipedia).

Advantages:
- Faster execution than interpreted language

Disadvantages:
- It takes time to compile the program before its execution
- Compiled code depends on the compilation platform

Examples of compiled languages:
- C
- Go
- Pascal

## Interpretation
Interpretation transforms source code to bytecode (an intermediate representation language), which is then executed by the interpreter step by step. Interpreted languages are cross-platform but take longer to execute than compiled languages.

Advantages:
- Platform-independent code
- Smaller programs than compiled languages

Disadvantages:
- Slower execution

Examples of interpreted languages:
- Python
- Lisp
- PHP


## Dynamic
In dynamic typing, code is checked at runtime, and there is no need to specify the data type of each variable. In dynamic languages, variables can store any data type, and you can change this at any time during program execution. This speeds up development because you can reuse existing variables to store new values.

## Strong
Strong typing languages permit mixing types in expressions and don't apply different implicit casts of types.

## Static
Static typing checks are performed without running the program, so every detail of the variables and data types must be known before compiling. This means that you can handle most bugs in the code during compilation.

## Weak
Weak typing languages apply implicit casts of types. As a result, the output of some expressions may be surprising