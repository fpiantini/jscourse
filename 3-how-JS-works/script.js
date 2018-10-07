///////////////////////////////////////
// Lecture: Hoisting

/*
// We can call the function before the
// declaration because of hoisting
calculateAge(1964);

function calculateAge(year) {
  console.log(2018 - year);
}

// We cannot call retirement before the
// declaration because retirement is a
// variable, and hoisting does not initialize
// variables but leave them undefined
// this does not work (retirement is undefined):
//   retirement(1964);

var retirement = function(year) {
  console.log(65 - (2018 - year));
}

// this works:
retirement(1964);


// ---- Variables ----
// for hoisting, variables exist but
// are undefined until they are really
// encountered in code.
// So, the next line of code prints 'undefined':
console.log(age);

// this age is in the global execution context
var age = 12;

console.log(age);

function foo() {
  // this age below is in the foo()
  // execution context
  var age = 65;
  console.log(age);
}
foo()
console.log(age);

*/


///////////////////////////////////////
// Lecture: Scoping


// First scoping example
/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        // scoping chain: from here we
        // see 'a' and 'b' (but no viceversa)
        console.log(a + ' ' + b + ' ' + c);
        third();
    }
}

function third() {
    var b = 'Ciao!';
    // If you uncomment the next line,
    // when you call third() you will receive
    // an Uncaught Reference Error (c is not defined)
    // console.log('This is an error: cannot access c: ' + c);
  
    // Instead, the next line is correct
    // third() has access to global variable 'a':
    console.log('OK, third() can access a: ' + a);
    console.log('And obviously the local b too: ' + b);
}
*/


///////////////////////////////////////
// Lecture: The this keyword

// Global scope: this === the window object
//console.log(this);

var a = 'Hello!';

function calculateAge(year) {
  console.log(2018 - year);
  // also inside a function in the global scope,
  // this points to the window object
  console.log(this);
}

calculateAge(1964);

function first() {
  var b = 'Hi!';
  second();

  function second() {
    var c = 'Hey!';
    // scoping chain: from here we
    // see 'a' and 'b' (but no viceversa)
    console.log(a + ' ' + b + ' ' + c);

    
    // ...and so on... always the window object:
    console.log(this);
  }
}

first();

var frank = {
  firstName: 'Francesco',
  lastName: 'Piantini',
  birthYear: 1964,
  height: 1.76,
  weight: 72,
  calcBMI: function () {
    'use strict';
    // method inside an object declaration:
    // this points to the object itself
    console.log(this);
    
    // we can always access to the window object
    // calling it explicitely:
    //console.log(window);
    
    this.bmi = this.weight / (this.height * this.height);

    function innerFunction() {
      // IMPORTANT: innerFunction() is not a method
      // of object frank, it is simply a function
      // declared inside a method. So, 'this' does not
      // point to the object, instead it SHOULD point
      // to the window object, and the next log line
      // should print the window object.
      // But, for some reason, when I try this code,
      // the next console line prints 'undefined'.
      // Probably there are different implementations
      // depending on the version standard, so it is
      // a good idea do not use the 'this' keyword inside
      // contextes like this one (portability issues).
      //console.log(this);
    }
    innerFunction();
    return this.bmi;

  }
};

console.log('Frank BMI: ' + frank.calcBMI());

var edo = {
  firstName: 'Edoardo',
  lastName: 'Piantini',
  birthYear: 2006,
  height: 1.35,
  weight: 40,
};

edo.calcBMI = frank.calcBMI;
console.log('Edo BMI: ' + edo.calcBMI());











