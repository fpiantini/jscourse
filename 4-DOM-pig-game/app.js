/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var document;
var scores, roundScore, activePlayer;
var gameIsActive;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gameIsActive = 1;

function switchPlayer() {
  // switch player
  // the 'active' class shall be removed for the player becoming inactive
  // and added to the player becoming active. Otherwise we can use toggle
  // (see below)
  //  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  var curPlayerRoundScore = document.getElementById('current-' + activePlayer);
  curPlayerRoundScore.textContent = '0';
  activePlayer = (activePlayer + 1) % 2;
  //  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
  roundScore = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

// example of CSS modification: remove the dice from page.
// To select the dice select th class 'dice' using the
// querySelector() method.
// It is preferable to use getElementById (faster), we
// use querySelector sometimes in this program just for
// learning purposes
// Using querySelector to select via 'class' ('.'):
document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// --------------------------------------------------------------------------
// Events reference:
//   https://developer.mozilla.org/en-US/docs/Web/Events
// Add an event listener for roll button click using an anonymous function
document.querySelector('.btn-roll').addEventListener('click', function() {
  
  // defines variables we will use later
  var dice, diceDOM, curPlayerRoundScore;
  
  // if game is not active, does nothing
  if (!gameIsActive)
    return;
    
  diceDOM = document.querySelector('.dice');
  curPlayerRoundScore = document.getElementById('current-' + activePlayer);
  
  // 1. random number
  dice = Math.floor(Math.random() * 6) + 1;
  // console.log('dice value: ' + dice);

  // 2. display the result
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. update the round score IF the rolled number was NOT a 1
  if (dice !== 1) {
    roundScore += dice;
    curPlayerRoundScore.textContent = roundScore;
    
  } else {
    switchPlayer();
  }

});

// Add an event listener for hold button click using an anonymous function
document.querySelector('.btn-hold').addEventListener('click', function() {

  // if game is not active, does nothing
  if (!gameIsActive)
    return;
  
// adds round score to GLOBAL score and then switch the player
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  
  // check if the player wins (score > 100)
  if (scores[activePlayer] >= 20) {
    document.getElementById('name-' + activePlayer).textContent = 'VINCITORE!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-' +
                activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-' +
                activePlayer + '-panel').classList.add('winner');
    
    gameIsActive = false;
    
  } else {
    
    // switch the player
    switchPlayer();
    
  }
  
});







// Additional snippets:
// a) how to use the innerHTML method to change the content of the
//    page using also HTML tags (more powerful of textContent):
//
//     document.querySelector('#current-' + activePlayer).innerHTML =
//                     '<em>' + dice + '</em>';
//
