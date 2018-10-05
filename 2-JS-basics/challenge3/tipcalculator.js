var bills = [124, 48, 268];

var tipCalculator= function(bill) {
  if (bill < 50)
    return bill * .2;
  if (bill < 200)
    return bill * .15;
  
  return bill * .1;
}

var ndx;
var tips = [], totals = [], grandtotal = 0;
for (ndx = 0; ndx < bills.length; ndx += 1) {
  tips.push(tipCalculator(bills[ndx]));
  totals.push(bills[ndx] + tips[ndx]);
  grandtotal += totals[ndx];
}

console.log("bills     : " + bills);
console.log("tips      : " + tips);
console.log("totals    : " + totals);
console.log("grandtotal: " + grandtotal);

