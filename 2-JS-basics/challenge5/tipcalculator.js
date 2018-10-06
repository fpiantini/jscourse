// ----------------------------------------------
var john = {
  bills: [124, 48, 268, 180, 42],
  tips: [],
  totals: [],
  
  calcTip: function (bill) {
    'use strict';
    if (bill < 50) {
      return bill * 0.2;
    } else if (bill < 200) {
      return bill * 0.15;
    } else {
      return bill * 0.1;
    }
  },
  calcTipAndTotals: function () {
    'use strict';
    var ndx;
    for (ndx = 0; ndx < this.bills.length; ndx += 1) {
      this.tips.push(this.calcTip(this.bills[ndx]));
      this.totals.push(this.bills[ndx] + this.tips[ndx]);
    }
  }
};

// ----------------------------------------------
var mark = {
  bills: [77, 375, 110, 45],
  tips: [],
  totals: [],
  
  calcTip: function (bill) {
    'use strict';
    if (bill < 100) {
      return bill * 0.2;
    } else if (bill < 300) {
      return bill * 0.1;
    } else {
      return bill * 0.25;
    }
  },
  calcTipAndTotals: function () {
    'use strict';
    var ndx;
    for (ndx = 0; ndx < this.bills.length; ndx += 1) {
      this.tips.push(this.calcTip(this.bills[ndx]));
      this.totals.push(this.bills[ndx] + this.tips[ndx]);
    }
  }
};

// ----------------------------------------------
var calcAverage = function (vals) {
  'use strict';
  var ndx, ave = 0;
  for (ndx = 0; ndx < vals.length; ndx += 1) {
    ave += vals[ndx] / vals.length;
  }
  return ave;
};


// ----------------------------------------------
john.calcTipAndTotals();
console.log('Jonh bills, tips and totals:');
console.log('   - bills : ' + john.bills);
console.log('   - tips  : ' + john.tips);
console.log('   - totals: ' + john.totals);

mark.calcTipAndTotals();
console.log('Mark bills, tips and totals:');
console.log('   - bills : ' + mark.bills);
console.log('   - tips  : ' + mark.tips);
console.log('   - totals: ' + mark.totals);

john.averageTip = calcAverage(john.tips);
mark.averageTip = calcAverage(mark.tips);

console.log("John average tip: " + john.averageTip);
console.log("Mark average tip: " + mark.averageTip);

if (john.averageTip === mark.averageTip) {
  console.log("John and Mark families paid the same tips in average");
} else if (john.averageTip > mark.averageTip) {
  console.log("John family paid the highest tips in average");
} else {
  console.log("Mark family paid the highest tips in average");
}

