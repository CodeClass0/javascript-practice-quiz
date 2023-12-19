var answeEl = document.querySelector("#answerBlock");
var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#startBtn");
var questionBlock = document.querySelector("#titletext");
var description = document.querySelector("#description")
var aButton = document.querySelector("#aBtn");
var bButton = document.querySelector("#bBtn");
var cButton = document.querySelector("#cBtn");
var dButton = document.querySelector("#dBtn");
var answerButtons = document.querySelector(".answerBtn");
var passFail = document.querySelector("#passfail");
var timeLeft = 59;
var body=document.body;

var question1 = {
    question: "Arrays in Javascript can be used to store _________.",
    answerA: "numbers and strings",
    answerB: "other arrays",
    answerC: "booleans",  
    answerD: "all of the above",
    correctAnswer: "all of the above",
};

var question2 = {
    question: "String values must be enclosed within _________ when being assigned to variables.",
    answerA: "commas",
    answerB: "curly brackets",
    answerC: "quotes",  
    answerD: "parenthesis",
    correctAnswer: "quotes",
}

var question3 = {
    question: "The condition in an if/else statement is enclosed with _________.",
    answerA: "quotes",
    answerB: "curly brackets",
    answerC: "parenthesis",  
    answerD: "square brackets",
    correctAnswer: "parenthesis",
};
    
var question4 = {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answerA: "JavaScript",
    answerB: "terminal/bash",
    answerC: "for loops",  
    answerD: "console.log",
    correctAnswer: "console.log",
};

var question5 = {
    question: "Commonly used data types do NOT include:",
    answerA: "strings",
    answerB: "booleans",
    answerC: "alerts",  
    answerD: "numbers",
    correctAnswer: "alerts", 
};

var questionArray = [question1,question2,question3,question4,question5];

function displayQuestion(index){
    questionBlock.textContent = questionArray[index].question;
    description.setAttribute("style", "display:none");
    aButton.textContent = questionArray[index].answerA;
    aButton.setAttribute("style", "display:block");
    bButton.textContent = questionArray[index].answerB;
    bButton.setAttribute("style", "display:block");
    cButton.textContent = questionArray[index].answerC;
    cButton.setAttribute("style", "display:block");
    dButton.textContent = questionArray[index].answerD;
    dButton.setAttribute("style", "display:block");
}

startBtn.addEventListener("click", function(event){
    event.preventDefault();
    countdown(); 
    startBtn.setAttribute("style", "display:none");
    displayQuestion(0);
})

aButton.addEventListener("click", function(event){
    checkAnswer(questionArray[0].answerA);
});

bButton.addEventListener("click", function(event){
    checkAnswer(questionArray[0].answerB);
});

cButton.addEventListener("click", function(event){
    checkAnswer(questionArray[0].answerC);
});

dButton.addEventListener("click", function(event){
    checkAnswer(questionArray[0].answerD);
});

function checkAnswer(choice){
    var rubric = questionArray[0].correctAnswer;
    if(choice == rubric){
        passFail.textContent = "Correct!";
    }else{
        passFail.textContent = "Wrong!";
        timeLeft=timeLeft-10;
    }

    if (questionArray.length > 1){
        questionArray.shift();
        displayQuestion(0);
    }else{
        endGame();
    }
}

function endGame(){
    var finalScore = timeLeft; 
    questionBlock.textContent="All done!";
    description.textContent="Your final score is " + finalScore + "!";
    description.setAttribute("style", "display:visible");
    aBtn.setAttribute("style","display:none");
    bBtn.setAttribute("style","display:none");
    cBtn.setAttribute("style","display:none");
    dBtn.setAttribute("style","display:none");

}

function countdown() {
    timerEl.textContent = "Time: 60";

  
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


