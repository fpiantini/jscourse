var massFrancesco = 72;  // Kg
var heightFrancesco = 1.76;  // meters
var massEdo = 30;  // Kg
var heightEdo = 1.36;  // meters

var bmiFrancesco = massFrancesco / (heightFrancesco * heightFrancesco);
var bmiEdo = massEdo / (heightEdo * heightEdo);

console.log("Francesco's BMI: " + bmiFrancesco);
console.log("Edoardo's BMI: " + bmiEdo);

if (bmiFrancesco > bmiEdo) {
  console.log("Francesco has higher BMI");
}
else {
  console.log("Edoardo has higher BMI");
}

