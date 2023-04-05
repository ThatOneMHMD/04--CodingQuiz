// quiz.js

// Load the saved scores from localStorage
let scores = JSON.parse(localStorage.getItem('quiz-scores')) || [];

// Function to save the score
function saveScore(newScore) {
  scores.push(newScore);
  localStorage.setItem('quiz-scores', JSON.stringify(scores));
}

// Function to display the scores in a table
function displayScores() {
  let table = document.getElementById('score-table');

  for (let i = 0; i < scores.length; i++) {
    let row = table.insertRow(-1);

    let quizNumber = i + 1;
    let score = scores[i];

    let quizNumberCell = row.insertCell(0);
    quizNumberCell.innerHTML = quizNumber;

    let scoreCell = row.insertCell(1);
    scoreCell.innerHTML = score;
  }
}

// Call the displayScores function when the page is loaded
window.onload = function() {
  displayScores();
};

// Example usage: call saveScore() when a quiz is completed
let quizScore = 85;
saveScore(quizScore);


// MORE/for loop func:

function addRow(event) {
    // loop through the updated scores array
    for (let i = 0; i < callUpdatedScores.length; i++) {
      let row = table.insertRow(-1);
  
      // create cells for name, time, score, and clear button
      let nameCell = row.insertCell(0);
      let timeCell = row.insertCell(1);
      let scoreCell = row.insertCell(2);
      let buttonCell = row.insertCell(3);
  
      // set the text content of the name, time, and score cells
      nameCell.textContent = callUpdatedScores[i].initials;
      timeCell.textContent = callUpdatedScores[i].time;
      scoreCell.textContent = callUpdatedScores[i].scores;
  
      // create and add the clear button to its cell
      let button = document.createElement('button');
      button.classList.add('clearBtn');
      button.textContent = 'Clear';
      buttonCell.appendChild(button);
    }
  }
  