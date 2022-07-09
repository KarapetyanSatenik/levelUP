class user{
    constructor(){}
     foo(params) {
        
    }
}

let x = new user()
for (const key in x) {
    console.log(key);
}

for (const key in user) {
    console.log(key);
}