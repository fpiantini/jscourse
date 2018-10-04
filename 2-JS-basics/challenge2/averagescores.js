var johnScores = [113, 150, 103];
var johnAverage = 0;
var mikeScores = [149, 94, 123];
var mikeAverage = 0;
var maryScores = [115, 146, 105];
var maryAverage = 0;
var cnt;

for (cnt = 0; cnt < johnScores.length; cnt += 1) {
  johnAverage += johnScores[cnt] / johnScores.length;
}
for (cnt = 0; cnt < mikeScores.length; cnt += 1) {
  mikeAverage += mikeScores[cnt] / mikeScores.length;
}
for (cnt = 0; cnt < maryScores.length; cnt += 1) {
  maryAverage += maryScores[cnt] / maryScores.length;
}

console.log("jonhAverage: " + johnAverage);
console.log("mikeAverage: " + mikeAverage);
console.log("maryAverage: " + maryAverage);

if ((johnAverage === mikeAverage) && (johnAverage == maryAverage)) {
  console.log("All the players have the same average: " + maryAverage);
}
else if ((johnAverage >= mikeAverage) && (johnAverage >= maryAverage)) {
  console.log("john has the highest average: " + johnAverage);
}
else if ((mikeAverage >= johnAverage) && (mikeAverage >= maryAverage)) {
  console.log("mike has the highest average: " + mikeAverage);
}
else {
  console.log("mary has the highest average: " + maryAverage);  
}



