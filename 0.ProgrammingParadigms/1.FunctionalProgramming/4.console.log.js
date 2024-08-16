console.log = undefined 

function pure(a){
    console.log(a)
  return a + 2;
}

alert(pure(2))