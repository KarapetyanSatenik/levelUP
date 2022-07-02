# What is the Difference Between a Framework and Library?

- Buy a house, or build your own carefully.

Developers often use the terms “library” and “framework” as if they were the same. But there is a difference.
Both libraries and frameworks are reusable code written by someone else. Their purpose is to help you solve common problems in easier ways.

We can use a house as a metaphor to explain the difference between these concepts.
A library is like building your home from scratch, you have the choice to make your house as you wish, with any architecture you like, you can sort your rooms in the way you like.

On the other hand, Framework is like buying a new house, you don’t have to deal with building problems, but you can’t choose how to sort your rooms because the house is already built.

## The Technical Difference

- The technical difference between a framework and library lies in a term called inversion of control. When you use a library, you are in charge of the application flow. You choose when and where to call the library. When you use a framework, the framework is in charge of the flow. It provides you with a few places to plug in your code, but it calls the code you plugged in as needed.

## Framework Upsides

- Usually, a framework tells us what to do. it has the best practice of doing things and provides tooling to support us.
- Examples: Angular, Vue
- These frameworks created by dedicated teams, and ship with everything you need to build large-scale applications.
- These teams provide official style guides that follow best practices. Once you learn that you’re immediately productive.
- It also means that if you want to train new teammates, it will be easy.

## Framework Downsides

- A framework is built by writing a lot of code, this means longer loading time and a decrease in performance.
- Scalable architecture provides many things as we discussed above. Some applications are so simple, so using a framework makes things more complicated.
- With the Framework, we have a lot to learn. In every version, new things added and others removed or deprecated so you have to be up-to-date.

## Libraries Upsides

- On the other hand, we’re the ones who lead libraries.

Examples: React, JQuery

- Libraries focus only on how to use it, which means that the team doesn’t support libraries for global state management, like HTTP, routing, forms, etc..
- And that is a choice, it gives the user the ability of picking libraries that he wants.
- That means using libraries, giving us full control of our application, you only add what you want, which makes the application smoother. 

## Libraries Downsides

- When you are having fun making a specific architecture, it can ruin your application, so you need to take care of this.
- That’s why some people choose Angular or Vue because they don’t want to risk time and money building their own rules. they simply learn the framework’s rules and focus on playing the game.

## Conclusion

You tell libraries what to do, frameworks tell you what to do.

Overall, frameworks are more opinionated and libraries are more flexible. Both patterns of abstraction have their place in the world of programming, and while neither is inherently better, it’s important to determine which is appropriate for the problem you’re solving.

