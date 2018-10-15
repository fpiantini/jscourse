// The old way:
//var francesco = {
//  name: 'Francesco',
//  yearOfBirth: 1964,
//  job: 'programmer'
//}

/* eslint no-console: "allow" */

//(function () {
  
  'use strict';
  
  // 1. the function constructor way ************************************
  function theFunctionConstructorWay() {

    var francesco, edoardo, roberta;
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

    console.clear();
    
    console.log('Explore using the console... The variables are francesco and edoardo');
    var personProto = {
      calculateAge: function () {
        console.log(2018 - this.yearOfBirth);
      }
    }

    var francesco = Object.create(personProto);
    francesco.name = 'Francesco',
    francesco.yearOfBirth = 1964,
    francesco.job = 'programmer'
    console.log(francesco);
    
    var edoardo = Object.create(personProto,
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
  
    // Primitives
    var a = 23;
    // this is a real copy
    var b = a;
    a = 42;

    console.clear();

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
  }
  // ********************************************************************


  // 4. (First class) functions *****************************************
  function firstClassFunctions() {
    
    var years = [1964, 1964, 2006];

    console.clear();

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

  }

  // ********************************************************************

  // ********************************************************************
  // 5. Functions returning functions
  function functionReturningFunction() {
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

    var teacherQuestion = interviewQuestion('teacher');
    var designerQuestion = interviewQuestion('designer');
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
      'use strict';
      var score = Math.random() * 10;
      console.log(score > 5);
    }

    game();

    (function (goodLuck) {
      'use strict';
      var score = Math.random() * 10;
      console.log(score > (5 - goodLuck));
    }(5));
  }
  // ********************************************************************

  // ********************************************************************
  // 7. Closures
  function closures() {
    'use strict';

    console.clear();
    console.log('TO BE COMPLETED');
    
  }
  // ********************************************************************






//})






















