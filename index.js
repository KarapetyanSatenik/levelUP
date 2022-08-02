
const fs = require("fs");
fs.readFile("./file.txt", (err,data) => {
    console.log(2);
    console.log(data);
    setImmediate(() => {
        console.log(3);
    });
});

setImmediate(() => {
    console.log(1);
});

fs.readFile("./file.txt", (err,data) => {
    console.log(5);
    console.log(data);
    setImmediate(() => {
        console.log(6);
    });

});

setImmediate(() => {
    console.log(8);
});


// 1 8 2 data 5 data 3 6