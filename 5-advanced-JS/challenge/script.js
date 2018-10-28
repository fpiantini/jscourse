// The quiz game code
(function () {

  'use strict';
  
  var questions = [];
  var Question = function (question, answers, correctAnswer) {
  
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;

  };

  Question.prototype.display = function () {

    console.log(this.question);
    this.answers.forEach(function (a, ndx) {
      console.log((ndx + 1) + '. ' + a);
    });

  };

  Question.prototype.checkAnswer = function (ans) {
    return (ans === this.correctAnswer) ? true : false;
  };

  // -----------------------------------------------------

  questions.push(new Question(
    'Quale è la prima mossa del nero nella difesa siciliana?',
    [
      'e5',
      'c5',
      'Cf6'
    ],
    2
  ));

  questions.push(new Question(
    'Chi è stato il primo campione del mondo di scacchi?',
    [
      'Wilhelm Steinitz',
      'Garry Kasparov',
      'Alexander Alechine'
    ],
    1
  ));

  // ---------------------------------------------------
  function updateScore(ifRight, ifWrong) {
    var currentScore = 0;
    // closure... Please note how we are using currentScore:
    // it is inizialized at startup and then updated every
    // time that the closure is called (it is persistent
    // like a global but it is not a global)
    return function (isOK) {
      if (isOK) {
        currentScore += ifRight;
      }
      else {
        currentScore += ifWrong;
      }
      return currentScore;
    };
  }

  // ---------------------------------------------------
  var userAnswer = '';
  var ok;
  var thePrompt;
  var myScore = updateScore(1, -1);

  while (userAnswer !== 'exit') {

    //console.clear();
    var q = Math.floor(Math.random() * questions.length);
    questions[q].display();
    //console.log('Punteggio corrente: ' + currentScore);

    ok = false;
    thePrompt = 'Risposta? (enter \'exit\' to quit the game)';
    while (userAnswer !== 'exit' && ok !== true) {
      userAnswer = prompt(thePrompt);
      ok = questions[q].checkAnswer(parseInt(userAnswer, 10));
      thePrompt = 'Sbagliato! Prova ancora:';
      if (userAnswer !== 'exit') {
        console.log('Punteggio corrente: ' + myScore(ok));
      }
    }
  }
  console.clear();
  //console.log('Punteggio finale: ' + currentScore);

}());


