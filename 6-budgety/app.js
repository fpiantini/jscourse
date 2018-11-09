// **************************************************************
// --- BUDGET CONTROLLER (MODEL) ---
// **************************************************************
var budgetController = (function () {
  'use strict';
  
  var Expense, Income, calculateTotal, data;
  
  Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  
  Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  calculateTotal = function (type) {
    data.totals[type] = 0;
    data.allItems[type].forEach(function (fld) {
      data.totals[type] += fld.value;
    });
  };
  
  data = {
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
    
    
    deleteItem: function (type, id) {
      var ids, index;

      // alternativamente:
      //var ndx = 0;
      //for (ndx = 0; ndx < data.allItems[type].length; ndx += 1) {
      //  if (data.allItems[type].id === id) {
      //    break;
      //  }
      //}
      //if (ndx < data.allItems[type].length) {
      //  data.allItems[type].splice(index, 1);    
      //}
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(id);
      
      if (index >= 0) {
        data.allItems[type].splice(index, 1);
      }
    },
    
    calculateBudget: function () {
      
      // calculate total income  and expenses
      calculateTotal('income');
      calculateTotal('expense');
      
      // calculate the budget: income - expenses
      data.budget = data.totals.income - data.totals.expense;

      // calculate the percentage of income that we spent
      if (data.totals.income > 0) {
        data.expPercent = Math.round((data.totals.expense / data.totals.income) * 100);
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

    calculatePercentages: function () {
      data.allItems.expense.forEach(function (exp) {
        exp.calcPercentage(data.totals.income);
      });
      return data.allItems.expense.map(function (exp) {
        return exp.getPercentage();
      });
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
  
  var DOMStrings, nodeListForEach, formatNumber;
  
  DOMStrings = {
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
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
    
  };
  
  nodeListForEach = function (list, callback) {
    var ndx;
    for (ndx = 0; ndx < list.length; ndx += 1) {
      callback(list[ndx], ndx);
    }
  };

  formatNumber = function (num, type) {
      
    var numSplit, len, beforeComma, pos, res;
      
    /* 
     * + or - before the number
     * exactly 2 decimal numbers
     * comma separating the thousand
     *
     *  income  2310.4567  --> + 2,310.46
     *  expense 2000       --> - 2,000.00
     */
    num = Math.abs(num).toFixed(2);
      
    numSplit = num.split('.');
      
    len = numSplit[0].length;
    beforeComma = len % 3;
    if (beforeComma === 0) {
      beforeComma = 3;
    }
    res = numSplit[0].substr(0, beforeComma);
    pos = beforeComma;
    while (pos < len) {
      res += ',' + numSplit[0].substr(pos, 3);
      pos += 3;
    }

    return (type === 'expense' ? '- ' : '+ ') +
      res + '.' + numSplit[1];
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
      newHtml = newHtml.replace('%value%',
                                formatNumber(obj.value, type));
      
      // insert the HTML into the DOM
      divid.insertAdjacentHTML('beforeend', newHtml);
      
    },

    // --------------------------------------
    deleteListItem: function (selectorId) {
      var el = document.getElementById(selectorId);
      el.parentElement.removeChild(el);
    },

    clearFields: function () {
      var fields, fieldsArray;
      
      fields = document.querySelectorAll(
        DOMStrings.inputDescription +
          ', ' + DOMStrings.inputValue
      );
      
      fieldsArray = Array.prototype.slice.call(fields);
      
      fieldsArray.forEach(function (fld) {
        fld.value = "";
        
      });
      
      fieldsArray[0].focus();
    },

    displayBudget: function (currentBudget) {
      document.querySelector(DOMStrings.divBudgetValue).textContent =
        ((currentBudget.budget >= 0) ?
            formatNumber(currentBudget.budget, 'income') :
            formatNumber(currentBudget.budget, 'expense'));
      document.querySelector(DOMStrings.divIncomeValue).textContent =
        formatNumber(currentBudget.totalIncome, 'income');
      document.querySelector(DOMStrings.divExpenseValue).textContent =
        formatNumber(currentBudget.totalExpense, 'expense');
      if (currentBudget.expensesPercentage >= 0) {
        document.querySelector(DOMStrings.divExpensePercentage).textContent =
          currentBudget.expensesPercentage + '%';
      } else {
        document.querySelector(DOMStrings.divExpensePercentage).innerHTML = '&nbsp;';
      }
    },
    
    displayPercentages: function (percents) {
      var fields;
      
      fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
      
      nodeListForEach(fields, function (current, index) {
        
        if (percents[index] >= 0) {
          current.textContent = percents[index] + '%';
        } else {
          current.innerHTML = '&nbsp;';
        }
      });
    },

    displayMonth: function () {

      var now, year, month, months;
      
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      document.querySelector(DOMStrings.dateLabel).textContent =
        months[month] + ' ' + year;
      
    },

    changedType: function () {

      var fields = document.querySelectorAll(
          DOMStrings.inputType + ', ' +
            DOMStrings.inputDescription + ', ' +
              DOMStrings.inputValue
        );
      
      nodeListForEach(fields, function (cur) {
        cur.classList.toggle('red-focus');
      });
      
      document.querySelector(DOMStrings.inputButton).classList.toggle('red');
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
  
  var updateBudget, updatePercentages, ctrlAddItem,
    ctrlDeleteITem, setupEventListeners;
  
  updateBudget = function () {
    // Calculate and display the budget
    uiCtrl.displayBudget(budgetCtrl.calculateBudget());
  };

  updatePercentages = function () {
    // calculate percentages and updates the UI
    uiCtrl.displayPercentages(budgetCtrl.calculatePercentages());
  };
  
  ctrlAddItem = function () {

    var input, newItem;
    
    // 1. Get the field input data
    input = uiCtrl.getInput();
    
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem =
        budgetCtrl.addItem(input.type, input.description, input.value);
    
      // 3. Add the new item to the UI
      uiCtrl.addListItem(newItem, input.type);
    
      // 4. Clear the fields
      uiCtrl.clearFields();
    
      // 5. Update the budget
      updateBudget();
      
      // 6. Calculate and update the percentages
      updatePercentages();
      
    }
  };
  
  ctrlDeleteITem = function (event) {
    var itemID, splitID, type, id;
  
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // income-<N> or expense-<N>
      splitID = itemID.split('-');
      type = splitID[0];
      id = splitID[1];
      
      // 1. delete the item from the data structure
      budgetCtrl.deleteItem(type, parseInt(id, 10));
      
      // 2. delete the item from the user interface
      uiCtrl.deleteListItem(itemID);
      
      // 3. update and show the new budget
      updateBudget();

      // 4. Calculate and update the percentages
      updatePercentages();

    }
  };
  
  setupEventListeners = function () {

    var DOM = uiCtrl.getDOMStrings();

    document.querySelector(DOM.inputButton).
      addEventListener('click', ctrlAddItem);
  
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
    
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteITem);
    
    document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changedType);
  };
  
  return {
    init: function () {
      console.log('Application has started');
      setupEventListeners();
      updateBudget();
      uiCtrl.displayMonth();
    }
  };
  
}(budgetController, uiController));

controller.init();