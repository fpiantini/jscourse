var budgetController = (function () {
  'use strict';
  var x = 23,
    add = function (a) {
      return x + a;
    };
  
  return {
    publicTest: function (b) {
      return add(b);
    }
  };
  
  
}());

var uiController = (function () {
  'use strict';
  // to be complteted
  
}());

var controller = (function (budgetCtrl, uiCtrl) {
  'use strict';
  var z = budgetCtrl.publicTest(5);
  
  return {
    anotherPublic: function () {
      console.log(z);
    }
  };
  
  
}(budgetController, uiController));

