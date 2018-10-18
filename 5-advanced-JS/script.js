// The old way:
//var francesco = {
//  name: 'Francesco',
//  yearOfBirth: 1964,
//  job: 'programmer'
//}

/*eslint no-console: "allow" */
/*jslint devel: true */

var francesco, edoardo, roberta;
  
// 1. the function constructor way ************************************
function theFunctionConstructorWay() {

  'use strict';
  var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  };

  console.clear();

  // This is more efficient that placing the
  // function inside the function constructur
  Person.prototype.calculateAge = function () {
    console.log(2018 - this.yearOfBirth);
  };

  // It is also possible to add properties
  // to the prototypes, but this does not offer
  // any advantage and it is probably less clear
  // than to have properties in the constructor.
  // For this reason, it is least common and less used
  Person.prototype.lastName = 'Surname';

  francesco = new Person('Francesco', 1964, 'programmer');
  francesco.lastName = 'Piantini';
  edoardo = new Person('Edoardo', 2006, 'student');
  edoardo.lastName = 'Piantini';
  roberta = new Person('Roberta', 1964, 'professor');
  roberta.lastName = 'Pierattelli';

  francesco.calculateAge();
  edoardo.calculateAge();
  roberta.calculateAge();

  console.log(francesco.lastName);
  console.log(edoardo.lastName);
  console.log(roberta.lastName);
}
// ********************************************************************



// 2. The Object.create way *******************************************
function theObjectCreateWay() {

  'use strict';
  console.clear();
  
  console.log('Explore using the console... The variables are francesco and edoardo');
  var personProto = {
    calculateAge: function () {
      console.log(2018 - this.yearOfBirth);
    }
  };

  francesco = Object.create(personProto);
  francesco.name = 'Francesco';
  francesco.yearOfBirth = 1964;
  francesco.job = 'programmer';
  console.log(francesco);
  
  edoardo = Object.create(personProto,
    {
      name: {value: 'Edoardo'},
      yearOfBirth: {value: 2006},
      job: {value: 'student'}
    });
  console.log(edoardo);
}
// ********************************************************************


// 3. Primitives vs. Objects ******************************************
function primitivesVsObjects() {

  'use strict';
  var a, b, obj1, obj2, age, obj;
  // Primitives
  a = 23;
  // this is a real copy
  b = a;
  a = 42;

  console.clear();

  console.log(a);
  console.log(b);

  // Objects
  obj1 = {
    name: 'Francesco',
    age: 54

  };

  // this is a copy of the reference
  obj2 = obj1;

  obj1.name = 'Edoardo';
  obj2.age = 12;

  console.log(obj1);
  console.log(obj2);

  // Functions (parameter passing)
  age = 54;
  obj = {
    name: 'Roberta',
    city: 'Firenze'
  };

  function change(a, b) {
    a = 22;
    b.city = 'San Francisco';
  }

  // Primitive 'age' is passed by value,
  // object 'obj' is passed by reference
  change(age, obj);

  console.log(age);
  console.log(obj.city);
}
// ********************************************************************


// 4. (First class) functions *****************************************
function firstClassFunctions() {
   
  'use strict';
  var years, ages;
  
  console.clear();

  years = [1964, 1964, 2006];

  function arrayCalc(arr, fn) {

    var cnt, arrResult = [];
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

  ages = arrayCalc(years, calculateAge);
  console.log(ages);
  console.log(arrayCalc(ages, isFullAge));
  console.log(arrayCalc(ages, maxHeartRate));
}
// ********************************************************************

// ********************************************************************
// 5. Functions returning functions
function functionReturningFunction() {

  'use strict';
  var teacherQuestion, designerQuestion;

  function interviewQuestion(job) {
    if (job === 'designer') {
      return function (name) {
        console.log(name + ', can you please explain what UX design is?');
      };
    } else if (job === 'teacher') {
      return function (name) {
        console.log('What subject do you teach, ' + name + '?');
      };
    } else {
      return function (name) {
        console.log('Hello ' + name + ', what do you do?');
      };
    }
  }

  teacherQuestion = interviewQuestion('teacher');
  designerQuestion = interviewQuestion('designer');
  teacherQuestion('Loredana');
  designerQuestion('Edoardo');
  interviewQuestion('programmer')('Francesco');
}
// ********************************************************************

// ********************************************************************
// 6. IIFE Immediately Invoked Function Expressions
function immediatelyInvokedFunctionExpressions() {

  'use strict';
  console.clear();

  function game() {
    var score = Math.random() * 10;
    console.log(score > 5);
  }

  game();

  (function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score > (5 - goodLuck));
  }(5));
}
// ********************************************************************

// ********************************************************************
// 7. Closures
function closures() {
  
  'use strict';
  var retirementUS, retirementGermany, retirementIceland;
  
  console.clear();
  
  function retirement(retirementAge) {

    var a = ' years left until retirements';
    
    return function (yearOfBirth) {
      var age = 2018 - yearOfBirth;
      console.log((retirementAge - age) + a);
    };
  }
   
  retirementUS = retirement(66);
  retirementGermany = retirement(65);
  retirementIceland = retirement(67);
  
  retirementUS(1964);
  retirementGermany(1964);
  retirementIceland(1964);
 
  retirement(66)(2006);
   
}

// ********************************************************************


// ********************************************************************
// 8. Closures Challenge
function closureChallenge() {

  'use strict';
  var teacherQuestion, designerQuestion;

  // rewrite interviewQuestion() using Closures

  function interviewQuestion(job) {
    var preQ, postQ;
    
    if (job === 'designer') {
      preQ = "";
      postQ = ', can you please explain what UX design is?';
    } else if (job === 'teacher') {
      preQ = "What subject do you teach, ";
      postQ = '?';
    } else {
      preQ = "Hello ";
      postQ = ', what do you do?';
    }
    return function (name) {
      console.log(preQ + name + postQ);
    };
  }

  teacherQuestion = interviewQuestion('teacher');
  designerQuestion = interviewQuestion('designer');
  teacherQuestion('Loredana');
  designerQuestion('Edoardo');
  interviewQuestion('programmer')('Francesco');
}


// ********************************************************************
// 9. Bind, call and Apply
function bindCallAndApply() {

  'use strict';
  
  console.clear();
  
  francesco = {
    name: 'Francesco',
    age: 54,
    job: 'programmer',
    presentation: function (style, timeOfDay) {
      if (style === 'formal') {
        console.log("Good " + timeOfDay + ", Ladies and Gentlemen! I'm " +
                    this.name + ", I'm a " + this.job +
                    " and I'm " + this.age + " years old.");
      } else if (style === 'friendly') {
        console.log("Hey, what's up? I'm " +
                   this.name + ", I'm a " + this.job +
                    " and I'm " + this.age + " years old. Have a nice " +
                   timeOfDay + ".");
      }
    }
  };

  edoardo = {
    name: 'Edoardo',
    age: 12,
    job: 'student'
  };
  
  francesco.presentation('formal', 'morning');
  
  // call...
  francesco.presentation.call(edoardo, 'friendly', 'afternoon');
  
  // ...apply...
  francesco.presentation.apply(edoardo, ['formal', 'night']);
  
  // ...and bind
  var francescoFriendly = francesco.presentation.bind(francesco, 'friendly');
  francescoFriendly('afternoon');
  francescoFriendly('night');

  var edoardoFormal = francesco.presentation.bind(edoardo, 'formal');
  edoardoFormal('morning');

  // ---------------------------------------------------
  var years = [1964, 1964, 2006];

  function arrayCalc(arr, fn) {

    var cnt, arrResult = [];
    for (cnt = 0; cnt < arr.length; cnt += 1) {
      arrResult.push(fn(arr[cnt]));
    }
    return arrResult;
  }

  function calculateAge(year) {
    return 2018 - year;
  }

  function isFullAge(limit, age) {
    return age >= limit;
  }

  var ages = arrayCalc(years, calculateAge);
  
  // use bind method to build a preset function
  // that can be used with the arrayCalc function
  // that accepts a function that takes a single
  // argument
  var isFullAgeIT = isFullAge.bind(null, [18]);
  
  var isFullAges = arrayCalc(ages, isFullAgeIT);
  
  console.log(years);
  console.log(ages);
  console.log(isFullAges);
  // ---------------------------------------------------
  
  
}




















