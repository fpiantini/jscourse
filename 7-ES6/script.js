// *************************************************************
// LECTURE 104: let and const
// *************************************************************

// ES5
var name5 = 'Francesco';
var age5 = 54;
name5 = 'Edoardo';
console.log(name5);

// ES6
const name6 = 'Francesco';
let age6 = 54;
//----> name6 = 'Edoardo'; // ERROR cannot change a const
console.log(name6);


// ----------------------------------------------------------
// ES5 variables are function scoped
// ES6 variables are block scoped

//ES5
function driversLicense5(passed) {
  if (passed) {
    // this does not generate an error (hoisted)
    console.log(firstName);
    var firstName = 'Francesco';
    var yearOfBirth = 1964;
  }

  console.log(firstName + ' born in ' + yearOfBirth +
           ' is now officially allowed to drive a car.');

}

driversLicense5(true);

function driversLicense6_wrong(passed) {
  if (passed) {
    let firstName = 'Francesco';
    const yearOfBirth = 1964;
  }
  // ERROR: let and const variables are block scoped
  console.log(firstName + ' born in ' + yearOfBirth +
            ' is now officially allowed to drive a car.');

}

function driversLicense6_OK(passed) {
  // ERROR: this generate a 'first name not declared' error:
  // ---> console.log(firstName);
  let firstName;
  const yearOfBirth = 1964; // we have to initialize here
                            // because it is a const

  if (passed) {
    firstName = 'Francesco';
  }
  // ERROR: let and const variables are block scoped
  console.log(firstName + ' born in ' + yearOfBirth +
            ' is now officially allowed to drive a car.');

}

driversLicense6_OK(true);

// ----------------------------------------------------------
let i = 23;

// The 'i' variable in the for is another variable
// of the one with the name declared outside
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i);



// *************************************************************
// LECTURE 105: blocks and IIFEs
// *************************************************************

// ES6: a new way to create IIFEs

{
  // a block
  const x = 1;
  let y = 2;
  
}

// ERROR: x and y are not accessible outside of the block (data privacy)
// ---> console.log(x + y);

// in ES5 we can achieve data privacy with IIFEs
// ES5:
(function () {
  var c = 3;
}());

// ERROR: variable defined in IIFE is not accessed from the outside
// ---> console.log(c);


// *************************************************************
// LECTURE 106: strings
// *************************************************************

let firstName = 'Francesco';
let lastName = 'Piantini';
const yearOfBirth = 1964;

function calculateAge(year) {
  return 2018 - year;
}

// ES5:
console.log('This is ' + firstName + ' ' + lastName + '. I was born in ' + yearOfBirth + '. Today I am ' + calculateAge(yearOfBirth) + ' years old.');

// ES6: use template literals
console.log(`This is ${firstName} ${lastName}. I was born in ${yearOfBirth}. Today I am ${calculateAge(yearOfBirth)} years old.`);

// ES6: new string methods
const n = `${firstName} ${lastName}`;

//   a) startsWith()
console.log(n.startsWith('F'));

//   b) endsWith()
console.log(n.endsWith('ini'));

//   c) includes()
console.log(n.includes('sco P'));

//   d) repeat()
console.log(`${n} `.repeat(5));


// *************************************************************
// LECTURE 107: Arrow functions
// *************************************************************

const years = [1964, 1971, 2006];

//ES5: we use 'map' to do things on arrays:
var ages5 = years.map(function(el) {
  return 2018 - el;
});

console.log(`ages5: ${ages5}`);

// ES6: arrow function
const ages6 = years.map(el => 2018 - el);
console.log(`ages6: ${ages6}`);

// More than one argument, and more than one line of code:
const currentYear = 2108;
const ages6b = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age element ${index + 1}: ${age}`; 
});
console.log(`ages6b: ${ages6b}`);

// *************************************************************
// LECTURE 108: Arrow functions, lexical this keyword
// *************************************************************

// the arrow functions share the surrounding this keyword

// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function () {
    // the box method clickMe still acces to the
    // object properties:
    var self = this;
    document.querySelector('.green').addEventListener('click', function () {
      // ERROR: this callback is a regular function and does not
      // access the box properties (this points to the global object)
      var str = 'This is box number ' + this.position + ' and I am ' + this.color;
      
      // correct! self is accessible
      str = 'This is box number ' + self.position + ' and I am ' + self.color;
      
      alert(str);
    });
  }
}

//box5.clickMe();

// ES6
const box6 = {
  color: 'green',
  position: 1,
  clickMe: function () {
    document.querySelector('.green').addEventListener('click', () => {
      // Correct: arrow functions access the object this keyword
      var str = `This is box number ${this.position} and I am ${this.color}`;

      alert(str);
    });
  }
}

//box6.clickMe();

/*
const box6b = {
  color: 'green',
  position: 1,
  // ERROR. If we made the clickMe method an arrow function
  // it shares the this keyword from the surrounding, and the
  // surrounding is the global object.
  clickMe: () => {
    document.querySelector('.green').addEventListener('click', () => {
      // Wrong: this point to the global object and the 'position'
      // and 'color' elements are undefined
      var str = `This is box number ${this.position} and I am ${this.color}`;

      alert(str);
    });
  }
}

box6b.clickMe();
*/

// ---------------------------------------------------------
// function constructor
function Person(name) {
  this.name = name;
}

// ES5
Person.prototype.myFriends5_wrong = function (friends) {
  var arr = friends.map(function(el) {
    // ERROR: function does not access the object 'this'
    // this.name is undefined
    return this.name + ' is friend with ' + el;
  });
  console.log(arr);
}
Person.prototype.myFriends5_trick = function (friends) {
  var arr = friends.map(function(el) {
    // we can use a trick based on bind()
    return this.name + ' is friend with ' + el;
  }.bind(this));
  console.log(arr);
}

var friends = ['Sergio', 'Paolo'];
var p = new Person('Francesco')
p.myFriends5_wrong(friends);
p.myFriends5_trick(friends);

// ES6
Person.prototype.myFriends6 = function (friends) {
  var arr = friends.map(el => `${this.name} is friend with ${el}`);
  console.log(arr);
}
const friends_e = ['Christian', 'Gregorio'];
let p_e = new Person('Edoardo')
p_e.myFriends6(friends_e);


// *************************************************************
// LECTURE 109: Destructuring
// *************************************************************

// ES5
var francesco = ['francesco', 54];
var name5 = francesco[0];
var age5 = francesco[1];

// ES6
// Destructuring an array
const [name6_109, age6_109] = ['edoardo', 12];
console.log(name6_109);
console.log(age6_109);

// destructuring an object
const obj = {
  fName: 'Francesco',
  lName: 'Piantini'
};

const {fName, lName} = obj;
console.log(`Hello, this is ${fName} ${lName}.`);

const {fName: a, lName: b} = obj;
console.log(`Hello, this is ${a} ${b}.`);

// a more useful usage of destructuring
// is to return multiple values from a function

// function that returns the age of a person
// and the years from retirement
function calcAgeAndRetirement (year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age, retirement] = calcAgeAndRetirement(1964);
console.log(`this gui is ${age} years old, and will retire in ${retirement} years`);

// *************************************************************
// LECTURE 110: Arrays in ES6 / ES2015
// *************************************************************
const boxes = document.querySelectorAll('.box');

// ES5: how to convert a list in an array (hack)
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(cur) {
  cur.style.backgroundColor = 'orange';
});

// ES6
//const boxesArr6 = Array.from(boxes);
//boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// or better:
Array.from(boxes).forEach(cur => cur.style.backgroundColor = 'dodgerblue');

// ------------ Loops ----
// In ES5 to loop over an array we can use forEach() or map()
// If we want to use 'break' or 'continue' we cannot use this
// methods, but we have to return to traditional 'for'
for (var boxndx = 0; boxndx < boxesArr5.length; boxndx++) {
  if (boxesArr5[boxndx].className === 'box orange') {
    continue;
  }
  boxesArr5[boxndx].textContent = 'I changed to orange (maybe)';
}

// ES6
for (const cur of Array.from(boxes)) {
  if (cur.className.includes('blue')) {
    continue;
  }
  cur.textContent = 'I changed to blue';
}


// ----- new methods to find an element in an array ---
// we have a group of children we know that one is
// full age. We want to find him and to have his age

// ES5
var ages5 = [12, 17, 8, 21, 14, 11];
var full5 = ages5.map(function (cur) {
  return cur > 18;
});
console.log(full5);
console.log(ages5[full5.indexOf(true)]);

// ES6
const ages_6 = [12, 17, 8, 21, 14, 11];
console.log(ages_6[ages_6.findIndex(cur => cur > 18)]);

// or better:
console.log(ages_6.find(cur => cur > 18));

// *************************************************************
// LECTURE 111: The Spread Operator
// *************************************************************

function addFourAges(a,b,c,d) {
  return a + b + c + d;
}
var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [ 18, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familyPiantini = [ 'Francesco', 'Roberta', 'Edoardo'];
const familyBacci = [ 'Raffaele', 'Patrizia', 'Matteo', 'Christian'];

const bigFamily = [...familyPiantini, 'Monica', ...familyBacci];
console.log(bigFamily);

const h = document.querySelector('h1');
const bbb = document.querySelectorAll('.box');
const all = [h, ...bbb];
console.log(all);

//Array.from(all).forEach(cur => cur.style.color = 'purple');
[h, ...bbb].forEach(cur => cur.style.color = 'purple');


// *************************************************************
// LECTURE 112: Rest parameters
// *************************************************************

//ES5
function isFullAge5(ageLimit) {
  //console.log(arguments);
  Array.prototype.slice.call(arguments, 1).forEach(function(cur) {
    console.log('ES5: ' + ((2018 - cur) >= ageLimit)); 
  });
  
}

isFullAge5(18, 1964, 2006);

// ES6
function isFullAge6(ageLimit, ...years) {
  years.forEach(
    cur => console.log(`ES6: ${(2018 - cur) >= ageLimit}`));
}

isFullAge6(18, 1964, 2006, 1971, 1984, 1200, 2009);


// *************************************************************
// LECTURE 113: Default parameters
// *************************************************************

//ES5
function MyFamilyPerson(firstName, yearOfBirth, lastName, nationality) {
  
  if (lastName === undefined) {
    lastName = 'Piantini';
  }
  if (nationality === undefined) {
    nationality = "Italian";
  }
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

var francesco = new MyFamilyPerson('Francesco', 1964);
console.log(francesco);
var roberta = new MyFamilyPerson('Roberta', 1964, 'Pierattelli');
console.log(roberta);

// ES6
function MyFamilyPerson6(firstName, yearOfBirth, lastName = 'Piantini', nationality = 'Italian') {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
}

var francesco = new MyFamilyPerson6('Francesco', 1964);
console.log(francesco);
var roberta = new MyFamilyPerson6('Roberta', 1964, 'Pierattelli');
console.log(roberta);

// *************************************************************
// LECTURE 114: Maps
// *************************************************************

const question=  new Map();
question.set('question', 'What is the official name of the latest major Javascript version?');

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer :-)');
question.set(false, 'Wrong answer, please try again');

console.log(question.get('question'));
console.log(question.size);

if (question.has(4)) {
  // question.delete(4);
  console.log('Answer 4 is here');
}

// to clear a map:
// question.clear();

//question.forEach((value, key) => console.log(`this is '${key}', with value '${value}'`));
console.log("---------------------------------------");
console.log(question.get('question'));
for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`Answer #${key}: '${value}'`);
  }
}

//const ans = parseInt(prompt('Answer?'));
//console.log(question.get(ans === question.get('correct')));


// *************************************************************
// LECTURE 115: Classes
// *************************************************************

// ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person5.prototype.calculateAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
}

var frank5 = new Person5('Francesco', 1964, 'Programmer');
frank5.calculateAge();

// ES6
class Person6 {
  constructor (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }
  calculateAge() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
    
  }
  
  // static methods
  static greeting() {
    console.log('Hello world!');
  }
}

const edoardo6 = new Person6('Edoardo', 2006, 'Student');
edoardo6.calculateAge();

Person6.greeting();

// *************************************************************
// LECTURE 116: Class Inheritance
// *************************************************************


// ES5
var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function () {
  this.medals++;
  console.log(this.name + ' won a medal. Total medals: ' + this.medals);
}


var lapoAthlete5 = new Athlete5('Lapo', 2006, 'swimmer', 1, 3);

lapoAthlete5.calculateAge();
lapoAthlete5.wonMedal();

// ES6
class Athlete6 extends Person6 {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
  }
  
  wonMedal() {
  this.medals++;
  console.log(`${this.name} won a medal. Total medals: ${this.medals}`);
  }
}

const lapoAthlete6 = new Athlete6('Lapo', 2006, 'swimmer', 1, 3);

lapoAthlete6.calculateAge();
lapoAthlete6.wonMedal();




















