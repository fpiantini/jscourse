var frank = {
  firstName: 'Francesco',
  lastName: 'Piantini',
  birthYear: 1964,
  height: 1.76,
  weight: 72,
  calcBMI: function () {
    'use strict';
    this.bmi = this.weight / (this.height * this.height);
    return this.bmi;
  }
};

var edo = {
  firstName: 'Edoardo',
  lastName: 'Piantini',
  birthYear: 2006,
  height: 1.36,
  weight: 30,
  calcBMI: function () {
    'use strict';
    this.bmi = this.weight / (this.height * this.height);
    return this.bmi;
  }
};


console.log('Frank BMI: ' + frank.calcBMI());
console.log('Edo BMI: ' + edo.calcBMI());

console.log(frank);
console.log(edo);

if (frank.bmi === edo.bmi) {
  console.log('Edo and Frank have the same BMI');
} else if (frank.bmi > edo.bmi) {
  console.log('Frank has higher BMI than Edo');
} else {
  console.log('Edo has higher BMI than Edo');
}