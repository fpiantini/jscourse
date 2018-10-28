// **************************************************************
// --- BUDGET CONTROLLER (MODEL) ---
// **************************************************************
var budgetController = (function () {
  'use strict';
  
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };

  // PUBLIC INTERFACE
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      
      // create new ID based on type
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      
      // create new item based on type
      if (type === 'expense') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'income') {
        newItem = new Income(ID, des, val);
      }
      
      // push into structure based on type
      data.allItems[type].push(newItem);
      
      // return the new element
      return newItem;
    },
    
    testing: function () {
      console.log(data);
    }
  };

  
}());

// **************************************************************
// --- UI CONTROLLER (VIEW) ---
// **************************************************************
var uiController = (function () {
  'use strict';
  
  var DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    divExpenseList: '.expenses__list',
    divIncomeList: '.income__list'
  };
  
  // PUBLIC INTERFACE ------------------------------------------
  return {
    // --------------------------------------
    getInput: function () {
      
      return {
        // type will be either 'income' or 'expense'
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      };
    },
    
    // --------------------------------------
    addListItem: function (obj, type) {
      var html, newHtml, divid;
      
      // Create HTML string with placeholder text
      if (type === 'income') {
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        divid = document.querySelector(DOMStrings.divIncomeList);
      } else if (type === 'expense') {
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        divid = document.querySelector(DOMStrings.divExpenseList);
      }
      
      // Replace the placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      
      // insert the HTML into the DOM
      divid.insertAdjacentHTML('beforeend', newHtml);
      
    },
    
    getDOMStrings: function () {
      return DOMStrings;
    }
  };
  // -------------------------------------------------------
  
}());

// **************************************************************
// --- GLOBAL APP CONTROLLER (CONTROLLER) ---
// **************************************************************
var controller = (function (budgetCtrl, uiCtrl) {

  'use strict';
  
  var  ctrlAddItem = function () {

    var input, newItem;
    
    // 1. Get the field input data
    input = uiCtrl.getInput();
    
    // 2. Add the item to the budget controller
    newItem =
        budgetCtrl.addItem(input.type, input.description, input.value);
    
    // 3. Add the new item to the UI
    uiCtrl.addListItem(newItem, input.type)
    // 4. Calcualate the budget
    
    // 5. Display the budget on the UI
    
    // test...
    budgetCtrl.testing();
  };
  
  var setupEventListeners = function () {

    var DOM = uiCtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).
      addEventListener('click', ctrlAddItem);
  
    document.addEventListener('keypress', function (event) {
    
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  
  return {
    init: function () {
      console.log('Application has started');
      setupEventListeners();
    }
  };
  
}(budgetController, uiController));

controller.init();