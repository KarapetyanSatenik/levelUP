Index.js is a especial case in node.js, it allows you to treat a folder like a module, so that when you pass the path to a folder to the require function it resolves to the index.js file. 
Just we will do 


```js
//internals/request.js
function send(){
    return 2
}

module.exports = {
    send,
}
```

```js
//internals/response.js
function get(){
    return 3
}

module.exports = {
    get,
}
```

```js
// internals/index.js
module.exports = {
request: require("./request"),
get: require("./response"),
}
// 2 option 

const request = require("./request")
const response = require("./response"),

module.exports = {
send: request.send,
get: response.get,
}

// 3 option 

module.exports = {
...require("./request"),
...require("./response"),
}
```

```js
// server.js
const internals = require("./internals")
internals.request.send()
internals.response.get()

// 2 option 
const {send,get} = require("./internals")

```

this object will contain the data we want to export from this folder.

So index.js allows you to to export functions from many different modules that live in a single folder from a single point which can be referenced using the name of that folder.

Byt Ryan Dahl says
- I thought it was cute, because there was index.html
- needlessly complicated the module loading system 
- it became especially unnecessary after require supported package.json