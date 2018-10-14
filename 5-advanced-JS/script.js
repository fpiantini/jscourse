// The old way:
//var francesco = {
//  name: 'Francesco',
//  yearOfBirth: 1964,
//  job: 'programmer'
//}


/* 
// 1. the function constructor way ************************************
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

// This is more efficient that placing the
// function inside the function constructur
Person.prototype.calculateAge = function() {
  console.log(2018 - this.yearOfBirth);
};

// It is also possible to add properties
// to the prototypes, but this does not offer
// any advantage and it is probably less clear
// than to have properties in the constructor.
// For this reason, it is least common and less used
Person.prototype.lastName = 'Surname';

var francesco = new Person('Francesco', 1964, 'programmer');
francesco.lastName= 'Piantini';
var edoardo = new Person('Edoardo', 2006, 'student');
edoardo.lastName= 'Piantini';
roberta = new Person('Roberta', 1964, 'professor');
roberta.lastName= 'Pierattelli';

francesco.calculateAge();
edoardo.calculateAge();
roberta.calculateAge();

console.log(francesco.lastName);
console.log(edoardo.lastName);
console.log(roberta.lastName);

*/
// ********************************************************************


/*
// 2. The Object.create way *******************************************
var personProto = {
  calculateAge: function() {
    console.log(2018 - this.yearOfBirth);
  }
}

var francesco = Object.create(personProto);
francesco.name = 'Francesco',
francesco.yearOfBirth = 1964,
francesco.job = 'programmer'

var edoardo = Object.create(personProto,
{
  name: {value: 'Edoardo'},
  yearOfBirth: {value: 2006},
  job: {value: 'student'}
});
// ********************************************************************
*/

/*
// 3. Primitives vs. Objects ******************************************
// Primitives
var a = 23;
// this is a real copy
var b = a;
a = 42;

console.log(a);
console.log(b);

// Objects
var obj1 = {
  name: 'Francesco',
  age: 54
  
};

// this is a copy of the reference
var obj2 = obj1;

obj1.name = 'Edoardo';
obj2.age = 12;

console.log(obj1);
console.log(obj2);

// Functions (parameter passing)
var age = 54;
var obj = {
  name: 'Roberta',
  city: 'Firenze'
}

function change (a, b) {
  a = 22;
  b.city = 'San Francisco';
}

// Primitive 'age' is passed by value,
// object 'obj' is passed by reference
change (age, obj);

console.log(age);
console.log(obj.city);

// ********************************************************************
*/

// 4. (First class) functions *****************************************

var years = [1964, 1964, 2006];

function arrayCalc(arr, fn) {
  
  var cnt;
  var arrResult = [];
  for (cnt = 0; cnt < arr.length; cnt += 1) {
    arrResult.push(fn(arr[cnt]));
  }
  return arrResult;
}

function calculateAge(year) {
  return 2018 - year;
}

function isFullAge(age) {
  return age >= 18;
}

function maxHeartRate(age) {
  if (age >= 18 && age <= 81) {
    return Math.round(206.9 - (0.67 * age));
  } else {
    return -1;
  }
}

var ages = arrayCalc(years, calculateAge);
console.log(ages);
console.log(arrayCalc(ages, isFullAge));
console.log(arrayCalc(ages, maxHeartRate));

// ********************************************************************



































