/*
 * Variables and data types
 */
/*
var firstName = 'Francesco';
console.log(firstName);

var lastName = 'Piantini';
var age = 54;
var fullAge = true;
console.log(fullAge);

var job;
console.log(job);

job = 'Programmer';
console.log(job);
*/

/*
 * Variable mutation and type coercion
 */
/*
var firstName = 'Francesco';
var age = 54;

// Type coercion (age becames a string )
console.log(firstName + ' ' + age)

var job, isMarried;
job = 'programmer';
isMarried = false;

console.log(firstName + ' is a ' + age + ' years old ' + job + '. Is he married? ' + isMarried);

// Variable mutation
age = 'fifty four';
alert(firstName + ' is a ' + age + ' year old ' + job + '. Is he married? ' + isMarried);


var lastName = prompt('What is his last name?');
console.log(firstName + ' ' + lastName);
*/

/*
 * Basic operators
 */
/*
var firstName = 'Francesco';
var ageFrancesco = 54;
var ageEdoardo = 11;
var now = 2018
var yearFrancesco = now - ageFrancesco;
var yearEdoardo = now - ageEdoardo;

// math operators
console.log(yearFrancesco);
console.log(now + 2);
console.log(now * 3);
console.log(now / 10);

// logical operators
var francescoOlder  = ageFrancesco > ageEdoardo;
console.log(francescoOlder);

// typeof operator
console.log(typeof francescoOlder);
console.log(typeof ageFrancesco);
console.log(typeof firstName);

var x;
console.log(typeof x);
*/

/*
 * Operators precedence
 */
/*
var now = 2018;
var yearFrancesco = 1964
var yearEdoardo = 2006;
var fullAge = 18;

var francescoIsFullAge = (now - yearFrancesco) >= fullAge
var edoardoIsFullAge = (now - yearEdoardo) >= fullAge

console.log('Francesco is ' + (now - yearFrancesco) + ' years old...');
if (francescoIsFullAge) {
  console.log('... and *it is* full age');  
}
else {
  console.log('... and it is *not* full age');  
}

console.log('Edoardo is ' + (now - yearEdoardo) + ' years old...');
if (edoardoIsFullAge) {
  console.log('... and *it is* full age');  
}
else {
  console.log('... and it is *not* full age');  
}

var average = ((now - yearFrancesco) + (now - yearEdoardo)) / 2;
console.log('average number of years: ' + average)
*/



/*
 * Example of a Function Expression
 */

var computeAverage = function(elems) {
  var ndx;
  var ave = 0;
  for (ndx = 0; ndx < elems.length; ndx += 1) {
    ave += elems[ndx] / elems.length;
  }
  return ave;
}

console.log("average test: " + computeAverage([1,2,3,4,5]));

