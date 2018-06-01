function app() {

  var startGameButton;
  var sendResponseButton;
  var indexQuestion = 0;
  var userPoints = 0;
  var totalFailedAnswers = 0;
  var totalCorrectAnswers = 0;
  var sumTimePerQuestion = 0;
  var indexCountDown = 0;
  var idSetInterval, answer, questions;
              ////PETICIÓN AL SERVIDOR/////
  ////////              CON AJAX                ///////

  // function getQuestions() {
  //   var request = new XMLHttpRequest();
  //   request.addEventListener("load", () => {
  //       questions = JSON.parse(request.responseText);
  //   });
  //   request.open("GET", '/api/questions');
  //   request.send();
  // }

////////              CON PROMESAS              ///////

// function getQuestions() {
//   return new Promise (function (resolve, reject) {
//     var request = new XMLHttpRequest();
//     request.open("GET", '/api/questions');
//     request.addEventListener("load", () => {
//         questions = JSON.parse(request.responseText);
//         resolve(questions);
//     });
//     request.open("GET", '/api/questions');
//     request.send();
//   });
//   }


 ////////              CON FETCH                ///////

 function getQuestions() {
  fetch('/api/questions')
    .then(function(data){
      return data.json();
    }).then(function(response){
      questions = response;
    });
    console.log(questions);
}

  

  function startGame() {
    printDomElements ();
    printNewQuestion();
    countDown();
  }

  function initialize(){
    getQuestions();
    startGameButton = document.getElementById('startGameButton');
    startGameButton.addEventListener("click", startGame);
    sendResponseButton = document.getElementById('sendResponse');
    sendResponseButton.addEventListener("click", startNewQuestion);
  }

  function printDomElements (){
    const radioButtons = document.getElementsByClassName('option');
    const timer        = document.querySelector(".timer");
    for (let i = 0; i < radioButtons.length; i++) {
      radioButtons[i].classList.remove("hidden");
    }
    startGameButton.classList.add("hidden");
    sendResponseButton.classList.remove("hidden");
    timer.classList.remove("hidden");
  }

  function printNewQuestion() {
    console.log(questions);
    const quizQuestion  = document.querySelector(".quizQuestion");
    const quizResponses = document.querySelectorAll(".questionsAndAnswers p");
    if (indexQuestion < questions.length) {
      quizQuestion.innerHTML = (questions[indexQuestion].question);
      for (let i = 0; i < questions[indexQuestion].answer.length; i++) {
        quizResponses[i].innerHTML = (questions[indexQuestion].answer[i].value);
      }
    }
  }

  function countDown() {
    const timer = document.querySelector(".timer");
    idSetInterval = setInterval(function () {
      if (indexCountDown <= 12) {
        timer.innerHTML = indexCountDown;
        indexCountDown++;
      } else {
        onTimeExpired();
      }
    }, 1000);
  }

  function onTimeExpired(){
    startNewQuestion();
  }
  
  function saveUserResponse(){
    const radioButtons = document.getElementsByName('radioInput');
    answer = { id: indexQuestion };
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].checked) {
        radioButtons[i].checked = false;
        answer = {
          id: indexQuestion,
          answerId: i
        };
      }
    }
  }

  function compareAndPrintResult(answer){
    const scoreMessage = document.querySelector(".result");
    scoreMessage.classList.remove("hidden");
    if (questions[indexQuestion].id !== answer.id) {
      return false;
    }
    if (questions[indexQuestion].correctAnswer.id !== answer.answerId) {
      scoreMessage.innerHTML = "Respuesta Incorrecta!";
      decreasePoints(indexCountDown);
      sumFailedAnswers();
    }else {
      scoreMessage.innerHTML = "Respuesta Correcta!";
      sumPoints(indexCountDown);
      sumCorrectAnswers();      
    }
  }

  function sumCorrectAnswers() {
    totalCorrectAnswers++; 
  }

  function sumFailedAnswers() {
    totalFailedAnswers++;
  }

  function sumPoints(timeSpent) {
    const playerPoints = document.querySelector('.score p');
    if (timeSpent <= 2) {
      playerPoints.innerHTML = userPoints += 2;
    }
    if (timeSpent > 2 && timeSpent <= 10) {
      playerPoints.innerHTML = userPoints += 1;
    }
  }

  function decreasePoints(timeSpent) {
    const playerPoints = document.querySelector('.score p');
    if (timeSpent <= 10) {
      playerPoints.innerHTML = userPoints -= 1;
    }
    else if (timeSpent >= 12) {
      playerPoints.innerHTML = userPoints -= 3;
    }
    else if (timeSpent > 10) {
      playerPoints.innerHTML = userPoints -= 2;
    }
  }

  function showStats() {
    const sumCorrectAnswers     = document.getElementById('totalCorrectAnswers');
    const averageSpeed          = document.getElementById('averageSpeed');
    const sumFailedAnswers      = document.getElementById('totalFailedAnswers');
    sumCorrectAnswers.innerHTML = totalCorrectAnswers;
    sumFailedAnswers.innerHTML  = totalFailedAnswers;
    averageSpeed.innerHTML      = calculateTimeAverage();
  }

  function calculateTimeAverage() {
    sumTimePerQuestion += indexCountDown;
    let timeAverage     = sumTimePerQuestion / (indexQuestion + 1);
    return timeAverage;
  }

  function onFinish() {
    const containerQuestions = document.querySelector(".questionsAndAnswers");
    const endGameMessage     = document.querySelector(".endGame");
    containerQuestions.classList.add('hidden');
    endGameMessage.classList.remove('hidden');
  }

  function analyzeResults(){
    saveUserResponse();
    compareAndPrintResult(answer);
    showStats();
  }

  function goToNextQuestion() {
    indexQuestion++;
  }

  function resetTimer() {
    indexCountDown = 0;
  }

  function startNewQuestion() {
    analyzeResults();
    if(indexQuestion == questions.length - 1){
      onFinish();
      clearInterval(idSetInterval);
    }else{
      goToNextQuestion();
      resetTimer();
      printNewQuestion();
    }
  }

  return {
    initialize : initialize
  };
}

