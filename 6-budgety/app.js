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
  
  var calculateTotal = function (type) {
    data.totals[type] = 0;
    data.allItems[type].forEach(function(fld) {
      data.totals[type] += fld.value;
    });
  };
  
  
  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0,
    expPercent: -1
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
    
    calculateBudget: function () {
      
      // calculate total income  and expenses
      calculateTotal('income');
      calculateTotal('expense');
      
      // calculate the budget: income - expenses
      data.budget = data.totals['income'] - data.totals['expense'];

      // calculate the percentage of income that we spent
      if (data.totals['income'] > 0) {
        data.expPercent = Math.round((data.totals['expense'] / data.totals['income']) * 100);
      } else {
        data.expPercent = -1;
      }
      
      return {
        budget: data.budget,
        totalIncome: data.totals.income,
        totalExpense: data.totals.expense,
        expensesPercentage: data.expPercent
      };
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
    divIncomeList: '.income__list',
    divBudgetValue: '.budget__value',
    divIncomeValue: '.budget__income--value',
    divExpenseValue: '.budget__expenses--value',
    divExpensePercentage: '.budget__expenses--percentage',
    container: '.container'
    
  };
  
  // PUBLIC INTERFACE ------------------------------------------
  return {
    // --------------------------------------
    getInput: function () {
      
      return {
        // type will be either 'income' or 'expense'
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
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
    
    clearFields: function () {
      var fields, fieldsArray;
      
      fields = document.querySelectorAll(
        DOMStrings.inputDescription + 
        ', ' + DOMStrings.inputValue);
      
      fieldsArray = Array.prototype.slice.call(fields);
      
      fieldsArray.forEach(function (fld, ndx, array) {
        fld.value = "";
        
      });
      
      fieldsArray[0].focus();
    },

    displayBudget: function (currentBudget) {
      document.querySelector(DOMStrings.divBudgetValue).textContent =
        ((currentBudget.budget >= 0) ? '+ ' : '- ') + currentBudget.budget.toFixed(2);
      document.querySelector(DOMStrings.divIncomeValue).textContent =
        '+ ' + currentBudget.totalIncome.toFixed(2);
      document.querySelector(DOMStrings.divExpenseValue).textContent =
        '- ' + currentBudget.totalExpense.toFixed(2);
      if (currentBudget.expensesPercentage >= 0) {
        document.querySelector(DOMStrings.divExpensePercentage).textContent =
          currentBudget.expensesPercentage + '%';
      } else {
        document.querySelector(DOMStrings.divExpensePercentage).innerHTML= '&nbsp;';
      }
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
  
  var updateBudget = function () {

    // Calculate and display the budget
    uiCtrl.displayBudget(budgetCtrl.calculateBudget());

  };
  
  
  var  ctrlAddItem = function () {

    var input, newItem;
    
    // 1. Get the field input data
    input = uiCtrl.getInput();
    
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem =
        budgetCtrl.addItem(input.type, input.description, input.value);
    
      // 3. Add the new item to the UI
      uiCtrl.addListItem(newItem, input.type)
    
      // 4. Clear the fields
      uiCtrl.clearFields();
    
      // 5. Update the budget
      updateBudget();
    }
  };
  
  
  
  
  
  
  var ctrlDeleteITem = function (event) {
    var itemID, splitID, type, id;
  
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // income-<N> or expense-<N>
      splitID = itemID.split('-');
      type = splitID[0];
      id = splitID[1];
      
      // 1. delete the item from the data structure
      
      // 2. delete the item from the user interface
      
      // 3. update and show the new budget
      
    }
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
    
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteITem);
  };
  
  return {
    init: function () {
      console.log('Application has started');
      setupEventListeners();
      updateBudget();
    }
  };
  
}(budgetController, uiController));

controller.init();