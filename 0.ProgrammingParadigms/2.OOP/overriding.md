## overriding

Method overriding is a concept tied with inheritance, when a child class inherits some method from the parent class but redefines it on its on context then it is known as method overriding. Let us see an example:
```js
class Polygon{
describe(){
console. log('I am a polygon' ) ;
}
}
A
class Square extends Polygonf
describe(){
console. log('I am a polygon with four equal sides'):
)
}
class Triangle extends Polygont
describe(){
console. log(I am a polygon with three sides');
}
}
poly = new Polygon();
poly. describe();
// I am a polygon
Sq = new Square();
sq. describe():
//I am a polygon with four equal sides
tri = new Triangle() ;
tri.describe();
// I am a polygon with three sides
```
## overloading
Method overloading is used to describe when two methods bears the same name but differs in type or the no. of arguments that are passed into the methods. While some languages like Java, supports method overloading, JavaScript does not allow method overloading. In the following example, when we try to overload the method, we will run into some issues.