// **************************************************************
// --- BUDGET CONTROLLER ---
// **************************************************************
var budgetController = (function () {
  'use strict';
  
  
}());

// **************************************************************
// --- UI CONTROLLER ---
// **************************************************************
var uiController = (function () {
  'use strict';
  
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  };
  
  // ---- PUBLIC INTERFACE ---------------------------------
  return {
    getInput: function () {
      
      return {
        // type will be either 'inc' or 'exp'
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },
    
    getDOMStrings: function () {
      return DOMStrings;
    }
  };
  // -------------------------------------------------------
  
}());

// **************************************************************
// --- GLOBAL APP CONTROLLER ---
// **************************************************************
var controller = (function (budgetCtrl, uiCtrl) {

  'use strict';
  var DOM = uiCtrl.getDOMStrings();
  var  ctrlAddItem = function () {

    // 1. Get the field input data
    var input = uiCtrl.getInput();
    console.log(input);
    
    // 2. Add the item to the budget controller
    
    // 3. Add the new item to the UI
    
    // 4. Calcualate the budget
    
    // 5. Display the budget on the UI

  };
  
  document.querySelector(DOM.inputButton).
    addEventListener('click', ctrlAddItem);
  
  document.addEventListener('keypress', function (event) {
    
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
    //console.log(event);
    
  });
  
  
  
  
}(budgetController, uiController));

