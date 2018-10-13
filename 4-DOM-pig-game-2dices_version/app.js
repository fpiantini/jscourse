/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var document;
var scores, roundScore, activePlayer;
var gameIsActive;
var previousRoll1, previousRoll2;
var targetScore;

// function sleep(milliseconds) {
//   'use strict';
//   var i, start;
//   start = new Date().getTime();
//   for (i = 0; i < 1e7; i += 1) {
//     if ((new Date().getTime() - start) > milliseconds) {
//       break;
//     }
//   }
// }
// var forceRedraw = function (element) {
// 
//   'use strict';
//   var n, disp;
//   if (!element) { return; }
// 
//   n = document.createTextNode(' ');
//   disp = element.style.display;  // don't worry about previous display style
// 
//   element.appendChild(n);
//   element.style.display = 'none';
// 
//   setTimeout(function () {
//     element.style.display = disp;
//     n.parentNode.removeChild(n);
//   }, 20); // you can play with this timeout to make it as short as possible
// };

function initGame() {
  'use strict';
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameIsActive = 1;
  previousRoll1 = 0;
  previousRoll2 = 0;
  targetScore = 100;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Giocatore 1';
  document.getElementById('name-1').textContent = 'Giocatore 2';

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';

  //document.getElementById('tscore').value = targetScore;

}

function rollDice(diceDOM) {
  'use strict';
  var dice;

  dice = Math.floor(Math.random() * 6) + 1;
  diceDOM.src = 'dice-' + dice + '.png';
  
  // document.querySelector('.btn-roll').style.display = 'none';
  // document.querySelector('.btn-hold').style.display = 'none';
  // for (cnt = 0; cnt < 10; cnt += 1) {
  //   setTimeout(function () {
  //     diceDOM.style.display = 'none';
  //   }, 200);
  //   sleep(200);
  //   //diceDOM.style.display = 'none';
  //   //forceRedraw(diceDOM);
  //   dice = Math.floor(Math.random() * 6) + 1;
  //   diceDOM.src = 'dice-' + dice + '.png';
  //   //diceDOM.style.display = 'block';
  //   setTimeout(function () {
  //     diceDOM.style.display = 'block';
  //   }, 200);
  //   sleep(200);
  //   //forceRedraw(diceDOM);
  //   //diceDOM.style.display = 'block';
  //   //sleep(100);
  // }
  // document.querySelector('.btn-roll').style.display = 'block';
  // document.querySelector('.btn-hold').style.display = 'block';

  return dice;
}


// -------------------------------------------------------
function switchPlayer() {
  'use strict';
  // switch player
  // the 'active' class shall be removed for the player becoming inactive
  // and added to the player becoming active. Otherwise we can use toggle
  // (see below)
  //  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer = (activePlayer + 1) % 2;
  //  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  roundScore = 0;
  previousRoll1 = 0;
  previousRoll2 = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}



// -------------------------------------------------------
// MAIN
// -------------------------------------------------------
initGame();

// --------------------------------------------------------------------------
// Events reference:
//   https://developer.mozilla.org/en-US/docs/Web/Events
// Add an event listener for roll button click using an anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {

  'use strict';
  
  // defines variables we will use later
  var dice1, dice1DOM, dice2, dice2DOM, curPlayerRoundScore;
  
  // if game is not active, does nothing
  if (!gameIsActive) {
    return;
  }
    
  dice1DOM = document.getElementById('dice-1');
  dice2DOM = document.getElementById('dice-2');
  curPlayerRoundScore = document.getElementById('current-' + activePlayer);
  
  // Display the dices
  dice1DOM.style.display = 'block';
  dice2DOM.style.display = 'block';
  
  // Roll the dices
  dice1 = rollDice(dice1DOM);
  dice2 = rollDice(dice2DOM);

  // evaluate the dice
  if (dice1 === 6 && dice2 === 6 && previousRoll1 === 6 && previousRoll2 === 6) {
    
    // 3. If the dice is a 6 and also the previous dice value
    //    was a 6, the player loses the entire score and pass
    curPlayerRoundScore.textContent = 0;
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    switchPlayer();

  } else if (dice1 !== 1 && dice2 !== 1) {
    // 4. update the round score IF the both the rolled numbers was NOT a 1
    //    otherwise the player pass the hand
    roundScore += dice1 + dice2;
    curPlayerRoundScore.textContent = roundScore;
    
    // updates the previous roll variables with current rolls
    previousRoll1 = dice1;
    previousRoll2 = dice2;
    
  } else {
    
    switchPlayer();
    
  }

});

// Add an event listener for hold button click using an anonymous function
document.querySelector('.btn-hold').addEventListener('click', function () {

  'use strict';

  // if game is not active, does nothing
  if (!gameIsActive) {
    return;
  }
  
  // adds round score to GLOBAL score and then switch the player
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  
  // check if the player wins (score >= targetScore)
  if (scores[activePlayer] >= targetScore) {
    document.getElementById('name-' + activePlayer).textContent = 'VINCITORE!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-' +
                activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' +
                activePlayer + '-panel').classList.add('winner');
    
    gameIsActive = false;
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';

  } else {
    
    // switch the player
    switchPlayer();
    
  }
  
});

// Add an event listener to change target score when related
// input field lost the focus
document.getElementById('tscore').addEventListener('blur', function () {

  'use strict';
  
  var newTScore;
  
  newTScore = parseInt(document.getElementById('tscore').value, 10);
  if (isNaN(newTScore) || newTScore < 10 || newTScore > 1000) {
    document.getElementById('tscore').value = "";
  } else {
    targetScore = newTScore;
    document.getElementById('tscore').value = newTScore;
  }
  
});


// -------------------------------------------------------
document.querySelector('.btn-new').addEventListener('click', initGame);



// Additional snippets:
// a) how to use the innerHTML method to change the content of the
//    page using also HTML tags (more powerful of textContent):
//
//     document.querySelector('#current-' + activePlayer).innerHTML =
//                     '<em>' + dice + '</em>';
//
