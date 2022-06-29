

// functioni depqum chenq karogh ogtagorcel extend, ete uzum enq mer function constructore jarangi,
// karox enq ogtagorcel proto

// When we read a property from object, and it’s missing, JavaScript automatically 
// takes it from the prototype. In programming, this is called “prototypal inheritance”. 
// classnere karogh en jarangelvel miayn classic qanzi child classing petq e steghci parent 
// constructore vorn el goyutyun chuni objecti depqum.
// Base object constructor function
function Animal(data) {
    var that = {}; // Create an empty object
    that.name = data.name; // Add it a "name" property
    return that; // Return the object
  };
  
  // Create achild object, inheriting from the base Animal
  function Cat(data) {
    // Create the Animal object
    var that = Animal(data);
    // Extend base object
    that.sayHello = function() {
      return 'Hello, I\'m ' + this.name;
    };
    return that;
  };
  
  // Usage
  var myCat = Cat({ name: 'Rufi' });
  console.log(myCat.sayHello());
  // Output: "Hello, I'm Rufi"