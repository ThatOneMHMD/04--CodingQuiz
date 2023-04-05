var table = document.querySelector("#table");
var submit = document.querySelector("#submit");

function addRecentScore(){
    enteredInitials = JSON.parse(localStorage.getItem("Initials"));
    timeRemaining= localStorage.getItem("Timer");
    finalScore = localStorage.getItem("Score");
    timeSpent = `${90 - timeRemaining}s`;

    var recentScore = {
        initials: enteredInitials,
        time: timeSpent,
        scores: finalScore
    };

    var updatedScores = JSON.parse(localStorage.getItem("UpdatedScores")) || [];
    var updatedScoresNoDuplicates = [];

    // Check if the recent score already exists in the array
    var isDuplicate = updatedScores.some(function(score) {
        return score.initials === recentScore.initials &&
               score.time === recentScore.time &&
               score.scores === recentScore.scores;
    });

    // If it's not a duplicate, add it to the new array
    if (!isDuplicate) {
        updatedScoresNoDuplicates = [...updatedScores, recentScore];
    } else {
        updatedScoresNoDuplicates = updatedScores;
    }

    localStorage.setItem("UpdatedScores", JSON.stringify(updatedScoresNoDuplicates));
};


function displayScores(){

    table.innerHTML = `                
        <tr>
            <th>Initials</th>
            <th>Time Spent</th>
            <th>Score</th>

        </tr>
        
    `;

    var updatedScores = JSON.parse(localStorage.getItem("UpdatedScores")) || [];

    // Sort the scores in descending order
    updatedScores.sort(function(a, b) {
        return b.scores - a.scores;
    });

    for (var i =0; i < updatedScores.length; i++){

        // Check if the row to prevent exists before adding it to the table
        if (updatedScores[i].initials !== null && updatedScores[i].scores !== null) {
            table.innerHTML += `
        
            <tr>
                <td> ${updatedScores[i].initials} </td>
                <td> ${updatedScores[i].time} </td>
                <td> ${updatedScores[i].scores} </td>
            
            </tr>
            
            `;
        }
    };
    
};

function clearScores(event) {
    event.preventDefault();
    if (event.target.classList.contains("clearBtn")) {
      localStorage.clear("UpdatedScores");
      displayScores();
    }
}
  
var clearBtn = document.querySelector("#clearBtn")
clearBtn.addEventListener("click", clearScores);


// my submit button is actually called return, but js does not accept a variable named return due to it being used as a key word for functions etc.
submit.addEventListener("click", function(event){

    event.preventDefault();

    window.location.href = "./index.html";

});

var hasRun = false;

function stopOnSecondReload() {
  if (!hasRun) {
    addRecentScore(); 
    displayScores(); 
    hasRun = true;
  }
}

stopOnSecondReload();


