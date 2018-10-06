///////////////////////////////////////
// Lecture: Hoisting

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
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









