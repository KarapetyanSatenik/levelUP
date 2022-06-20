const multiply = (a,b,c) =>console.log(a*b*c);

const partiallyMultiplyBy5 = multiply.bind(null,5,4,10);
partiallyMultiplyBy5() 