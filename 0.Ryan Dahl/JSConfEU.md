## 10 Things I Regret About Node.js — Ryan Dahl

He have only started using Node agin in the last 6 month, because his goal was heavily focused on programming event driven HTTP servers when he created Node and Go is a better language to build faster servers.

But he thinks JavaScript is nice. Dynamic languages may not suit for building a server, in which you want to control everything, but are the right tool for prototyping, for example, scientific computing. JavaScript is the best dynamic language.

His problems with Node are almost around how it manages user code. Mainly because he focused on the evented I/O, the module system was essentially an afterthought.

1. Not sticking with Promises
He added promises to Node in June 2009 but removed them in February 2010 for minimal. It’s possible unified usage of promise in Node would have sped the delivery of the standardization and async/await.

2. Security
Node program can access all the system calls, such as writing to the disk, accessing to the network.

3. The Build System
If you are writing a module links to a C library, you’d use GYP to compile that C library and link it into Node.

Chrome used to use GYB, but now Node is the sole GYP user.

Funky interface, it’s Python adaptation of JSON. Node has several unnecessary complex wrappers around it.


4. package.json
Include NPM in the Node making NPM the standard of the Node distribution.
Centralized (privately controlled) repository for modules.
`require(“sommodule”)` is not specific: package.json, local node_modules folder, NPM’s database.
Unnecessary abstraction to rise the concept of a “module” as a directory of files. Don’t exist on the web.
Includes unnecessary information, such as license, repository.

5. node_modules
Module resolution algorithm is wildly complex.
Vendored-by-default has good intentions, but $NODE_PATH would work.
Deviates from browser.

6. Require without the extension
Needlessly less explicit.
Not how browser works.
The module loader has to guess.

7. index.js
Needlessly complicated the module loading system.
Especially unnecessary after require supported package.json.

8. Security
By default a script should run without any network or file system write access.
Users can opt in to access via flags: ` — allow-net` ` — allow-write`
Don’t allow arbitrary native functions to be bound into V8.

9. TypeScript compiler built into the executable
TypeScript is beautiful
Finally delivered a practical optionally typed language.
Allows code to grow seamlessly from quick hacks to large, well structured machinery.
Normal JS should work too.

10. Simplify the module system
No compatible with Node modules.
Imports are relative or absolute URLs ONLY.
Imports must provide an extension.
Remote URLs fetched and cached indefinitely on the first load.
Vendoring can be done by specifying a not-default cache dir.

- Others
Ship only a single executable with minimal linkage.
Bootstrap the runtime bye compiling Node modules with parcel into a bundle.
Always die immediately on unhandled promises.
Support top-level await.
Browser compatible (`window` not `global`)
