var answeEl = document.querySelector("#answerBlock");
var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#startBtn");
var questionBank = {
    question1: "Arrays in Javascript can be used to store _________.",
    answer1a: "numbers and strings",
    answer1b: "other arrays",
    answer1c: "booleans",  
    answer1d: "all of the above",
    correctAnswer1: this.answer1d,

    question2: "String values must be enclosed within _________ when being assigned to variables.",
    answer2a: "commas",
    answer2b: "curly brackets",
    answer2c: "quotes",  
    answer2d: "parenthesis",
    correctAnswer2: this.answer2c,

    question3: "The condition in an if/else statement is enclosed with _________.",
    answer3a: "quotes",
    answer3b: "curly brackets",
    answer3c: "parentesis",  
    answer3d: "square brackets",
    correctAnswer3: this.answer3c,
    
    question4: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer4a: "JavaScript",
    answer4b: "terminal/bash",
    answer4c: "for loops",  
    answer4d: "console.log",
    correctAnswer4: this.answer4d,

    question5: "Commonly used data types do NOT include:",
    answer5a: "strings",
    answer5b: "booleans",
    answer5c: "alerts",  
    answer5d: "numbers",
    correctAnswer5: this.answer5c,
};

startBtn.addEventListener("click", function(event){
    event.preventDefault();
    countdown(); 
    startBtn.setAttribute("style", "display:none");
})

function endGame(){

}

function countdown() {
    timerEl.textContent = "Time: 60";
    var timeLeft = 59;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = "Time: " + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `endGame()` function
        endGame();
      }
    }, 1000);
  }

//So on click, I need:
//Start button to hide
//question to display
//answer fields to populate
//ansewr buttons to show
//timer to start

