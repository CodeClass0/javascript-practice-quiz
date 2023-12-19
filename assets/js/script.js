//hooks to html
var saveGame = document.querySelector("#saveScore");
var initialsEl = document.querySelector('input');
var submitButton = document.querySelector("#submitBtn");
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
var listEl = document.querySelector('ol');
var leaderboardBlock = document.querySelector('#leaderboard');
var goBack = document.querySelector("#goBackBtn");
var clear = document.querySelector("#clearBtn");

//global variables
var timeValue = 0;
var leaderboardEntry = ""; 
var viewScores = document.querySelector("#viewScore");
var leaderObj = {
    user: "",
    score: 0,
};
var userArray = [];
var passFail = document.querySelector("#passfail");
var timeLeft = 59;
var timeInterval = 0;
var inputValue ="";
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


//event listeners
viewScores.addEventListener("click",function(event){
    event.preventDefault();
    viewHighScores();
});
startBtn.addEventListener("click", function(event){
    event.preventDefault();
    leaderboardBlock.setAttribute("style", "display:none");
    countdown(); 
    startBtn.setAttribute("style", "display:none");
    displayQuestion(0);
    viewScores.setAttribute("style","visibility:visible");
});
submitButton.addEventListener("click",function(event){
    event.preventDefault();
    viewScores.setAttribute("style","visibility:hidden");
    leaderObj.user = initialsEl.value.substring(0,3);
    leaderObj.score = timeValue;
    userArray.push(leaderObj);
    leaderboardBlock.setAttribute("style","display:flex");
    var oldData = JSON.parse(localStorage.getItem('array'));
    // oldData.push(leaderObj);
    localStorage.setItem('array', JSON.stringify(oldData));
    compileLeaderboard();
    submitButton.setAttribute("style","display:none");
    var goBack = document.querySelector("#goBackBtn");
    goBack.setAttribute("style","display:flex; width:145px; font-size:17px; align-items: center;  justify-content:space-around;");
    var clear = document.querySelector("#clearBtn");
    clear.setAttribute("style", "display:flex; width:145px; font-size:17px; align-items: center; justify-content:space-around;");
});
goBack.addEventListener("click", function(event){
    viewScores.setAttribute("style","visibility:visible");
    event.preventDefault();
    location.reload();
});
clear.addEventListener("click", function(event){
    event.preventDefault();
    var oldData = JSON.parse(localStorage.getItem('array'));
    oldData = [];
    localStorage.setItem('array', JSON.stringify(oldData));
    var goBack = document.querySelector("#goBackBtn");
    goBack.setAttribute("style","display:flex; width:145px; font-size:17px; align-items: center;  justify-content:space-around;");
    var clear = document.querySelector("#clearBtn");
    clear.setAttribute("style", "display:flex; width:145px; font-size:17px; align-items: center; justify-content:space-around;");
    location.reload();
});
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




//functions
function viewHighScores(){
    questionBlock.textContent="High scores";
    startBtn.setAttribute("style","display:none");
    description.setAttribute("style","display:none");
    viewScores.setAttribute("style","visibility:hidden");
    clearInterval(timeInterval);
    passFail.setAttribute("style", "display:none");
    timerEl.setAttribute("style", "display:none");
    aBtn.setAttribute("style","display:none");
    bBtn.setAttribute("style","display:none");
    cBtn.setAttribute("style","display:none");
    dBtn.setAttribute("style","display:none");
    leaderboardBlock.setAttribute("style","display:flex");
    var oldData = JSON.parse(localStorage.getItem('array'));
    oldData.push(leaderObj);
    compileLeaderboard();
    submitButton.setAttribute("style","display:none");
    var goBack = document.querySelector("#goBackBtn");
    goBack.setAttribute("style","display:flex; width:145px; font-size:17px; align-items: center;  justify-content:space-around;");
    var clear = document.querySelector("#clearBtn");
    clear.setAttribute("style", "display:flex; width:145px; font-size:17px; align-items: center; justify-content:space-around;");
}
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
//This compiles and sorts by highest score
function compileLeaderboard(){
    var goBack = document.querySelector("#goBackBtn");
    goBack.setAttribute("style","display:flex; width:145px; font-size:17px; align-items: center;  justify-content:space-around;");
    var clear = document.querySelector("#clearBtn");
    clear.setAttribute("style", "display:flex; width:145px; font-size:17px; align-items: center; justify-content:space-around;");
    var oldData;
    oldData = JSON.parse(localStorage.getItem('array'));
    oldData.sort((a,b) => b.score-a.score);
    for(var i = 0; i<oldData.length; i++){
        var li = document.createElement("li");
        li.textContent = (oldData[i].user + " - " + oldData[i].score);
        li.setAttribute("style", "background-color:rgb(143,255,164); padding:6px; padding-left:10px; font-size: 20px; height:27px; margin:5px; border:1px solid black; border-radius:12px;");
        listEl.append(li);
    }
}
function endGame(){
    const finalScore = timeLeft; //I'm using const here because it holds the score once the timer hits zero. Using a var, it would change when the timer finished.
    timeValue = finalScore; //Apparently order matters here, as setting finalScore to timeValue broke, but setting timeValue to finalScore works.
    clearInterval(timeInterval);
    passFail.setAttribute("style", "display:none");
    timerEl.setAttribute("style", "display:none");
    questionBlock.textContent="All done!";
    description.textContent="Your final score is " + finalScore + "!";
    description.setAttribute("style", "display:visible");
    aBtn.setAttribute("style","display:none");
    bBtn.setAttribute("style","display:none");
    cBtn.setAttribute("style","display:none");
    dBtn.setAttribute("style","display:none");
    saveGame.setAttribute("style", "display:flex; Justify-content:center; font-size: 25px");
    submitButton.setAttribute("style","display:flex; align-items:center; Justify-content:center; font-size: 15px");
}
function checkAnswer(choice){
    var rubric = questionArray[0].correctAnswer;
    if(choice == rubric){
        passFail.textContent = "Correct!";
        passFail.setAttribute("style","color:black");
        
    }else{
        passFail.textContent = "Wrong!";
        passFail.setAttribute("style","color:red");
        timeLeft=timeLeft-10;
    }

    if (questionArray.length > 1){
        questionArray.shift();
        displayQuestion(0);
    }else{
        endGame();
    }
}
function countdown() {
    timerEl.textContent = "Time: 60";
    timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timerEl.textContent = "Time: " + timeLeft;
        timeLeft--;
      } else {
        timerEl.textContent = "Time's up!";
        clearInterval(timeInterval);
        endGame();
      }
    }, 1000);
 }


