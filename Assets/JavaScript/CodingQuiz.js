// timer variable: time starts at 90 secodns!
var timer = 90;

// questions-index variable
var questionIndex = 0;

// score varibale: the idea is that scores start at 100 and decrease when a question is answered incorrectly 
var score = 100;

// variables for the placement of the question and its four available choices
var questionH1 = document.querySelector('#questions');
var choice1 = document.querySelector('#choice1');
var choice2 =  document.querySelector('#choice2');
var choice3 = document.querySelector('#choice3');
var choice4 = document.querySelector('#choice4');

// variable to access the div containing all 4 choices
var choices = document.querySelector("#choices");

// variable for the result of the answer: ie. correct or incorrect!
var results = document.querySelector("#results");

// timer function: setInterval allows me to ecexute the function repeatedly at set intervals, for my case it is 1000ms or 1s!
var timerInterval = setInterval(function(){

    // each second, timer (90) is decreased by 1 and it is then written on the given id which transfers back to the html page
    timer--;
    document.querySelector('#timer').textContent = timer

    // when timer reaches 0s or less, then stop the function and trasnfer user to the mentioned webpage:
    if (timer <= 0){

        clearInterval(timerInterval)

        // this line ensures that when timer reaches zero, the quiz is closed and the user is oresented with their scores!
        window.location.href = "./scores.html";
    };

    // lastly, each second, save the timer in local storage!
    localStorage.setItem("Timer",timer);

}, 1000);


// the questions, choices, and correct asnwers in array format where each question and its followers are one object!
var questionsAndAnswers = [
    
    {
        questions: "Question 1: What is the most basic programming langauge?",
        choices: ["C#","HTML","Javascript", "I don't know!"],
        answer: "HTML"
    },

    { 
        questions: "Question 2: What are Arrays used for?",
        choices: ["Arrays are used to write essays","Arrays are used to store multiple values in a single variable","I don't like arrays!", "Help!"],
        answer: "Arrays are used to store multiple values in a single variable"
    },

    { 
        questions: "Question 3: What is the most reliable and easy-to-use styling program?",
        choices: ["HTML","Python","CSS", "I love popcorn!"],
        answer: "CSS"
    },

    { 
        questions: "Question 4: ________ is the process of finding and fixing errors or bugs in the source code of any software.",
        choices: ["Data Collection","Debugging","LIFO", "STACK Dev."],
        answer: "Debugging"
    },

    { 
        questions: "Question 5: Why do developers use javascript?",
        choices: ["To add interactivity and features to improve the user experience and make the internet much more enjoyable","To gain popularity","Because it is an extremely easy way of styling the websites for free", "Because they are required to"],
        answer: "To add interactivity and features to improve the user experience and make the internet much more enjoyable"
    },

];


// func to populate the choices buttons corresponding to each question, depending on their index
function btnPopulate(){

    questionH1.textContent = questionsAndAnswers[questionIndex].questions;
    
    choice1.textContent = questionsAndAnswers[questionIndex].choices[0];
    choice2.textContent = questionsAndAnswers[questionIndex].choices[1];
    choice3.textContent = questionsAndAnswers[questionIndex].choices[2];
    choice4.textContent = questionsAndAnswers[questionIndex].choices[3];
};

// must be called outside!
btnPopulate();


// makes it so that when user answers a questoin, they are presented with another!
function questionIncrease(){

    // increase question index each time
    questionIndex++

    // when index reaches the last question, transfer user to a different page!
    if (questionIndex === questionsAndAnswers.length){

        window.location.href = "./scores.html";
    } 

    // makes sure the buttons are always populated according to the correct index which is here increased after every question gets answered!
    btnPopulate();
};


// when you click on one of the choice buttons, this happenes!
choices.addEventListener('click', function(event){

    // first, we set the target of the click to the given class of buttons
    if (event.target.classList.contains("choiceBtn")) {

        // for me, can be ignored, but very helpful for debugging
        // console.log(questionsAndAnswers[questionIndex].answer);
        // console.log(event.target.textContent)
        // console.log(event.target.type)

        // shows if clicked choice matches correct answeres and displays result under question
        function ShowResults(event){

            if (event.target.textContent  == questionsAndAnswers[questionIndex].answer) {
        
                results.textContent = "Correct!";
                
                // for me
                // console.log("Correct!");
                
            } else {
        
                // if choice is incorrect: timer is decreased by 10 seconds and score is decreased by 20 (because 5 questions * 20 = 100)
                results.textContent = "Incorrect...";
                timer = timer - 10;
                score = score - 20;

                // for me (Was instructed to remove those...)
                // console.log("Incorrect..."); 
        
            } 

            // saves timer and score to storage after every choice is made!
            localStorage.setItem("Timer",timer);
            localStorage.setItem("Score", score);
        };

        // called
        ShowResults(event);

        // called
        questionIncrease();

        // for me (Was instructed to remove those...)
        // console.log(score);
        // console.log(timer);

    }
});