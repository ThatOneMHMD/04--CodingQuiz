// timer variable
var timer = 90;

// questions index variable
var questionIndex = 0;

// score varibale 
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

// timer function
var timerInterval = setInterval(function(){

    timer--;
    document.querySelector('#timer').textContent = timer
    

    if (timer === 0){

        clearInterval(timerInterval)

        // this line ensures that when timer reaches zero, the quiz is closed and the user is oresented with their scores!
        window.location.href = "./scores.html";
    };

    localStorage.setItem("Timer",timer);

}, 1000);



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



function btnPopulate(){

    
    questionH1.textContent = questionsAndAnswers[questionIndex].questions;
    
    choice1.textContent = questionsAndAnswers[questionIndex].choices[0];
    choice2.textContent = questionsAndAnswers[questionIndex].choices[1];
    choice3.textContent = questionsAndAnswers[questionIndex].choices[2];
    choice4.textContent = questionsAndAnswers[questionIndex].choices[3];
};

// must be called outside!
btnPopulate();


function questionIncrease(){

    
    questionIndex++
    if (questionIndex === questionsAndAnswers.length){

        // or just change classes to hiddden and add one to appear???
        window.location.href = "./scores.html";
        
    } 

    btnPopulate();
};





choices.addEventListener('click', function(event){

    if (event.target.classList.contains("choiceBtn")) {

        // for me
        console.log(questionsAndAnswers[questionIndex].answer);
        console.log(event.target.textContent)
        console.log(event.target.type)

        function ShowResults(event){

            if (event.target.textContent  == questionsAndAnswers[questionIndex].answer) {
        
                results.textContent = "Correct!";
                
                // for me
                console.log("Correct!");
                
            } else {
        
                results.textContent = "Incorrect...";
                timer = timer - 10;
                score = score - 20;

                // for me
                console.log("Incorrect..."); 
        
            } 

            localStorage.setItem("Timer",timer);
            localStorage.setItem("Score", score);

            
         
        };

        ShowResults(event);

        questionIncrease();

        // for me
        console.log(score);
        console.log(timer);

        

    }
    
});


