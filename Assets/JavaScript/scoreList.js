var table = document.querySelector("#table");
var submit = document.querySelector("#submit");

// one big func for dding recent scores
function addRecentScore(){

    // all these variables are gathering data from local storage corresponding to their name as specified:
    enteredInitials = JSON.parse(localStorage.getItem("Initials"));
    timeRemaining= localStorage.getItem("Timer");
    finalScore = localStorage.getItem("Score");

    // this is simply made so that it gives the time spent instead of the time remaining. Note that Initial time was 90s.
    timeSpent = `${90 - timeRemaining}s`;

    // var object of the gathered data
    var recentScore = {
        initials: enteredInitials,
        time: timeSpent,
        scores: finalScore
    };

    // first creates the variable array or if it has some value in the local storage from before then it gatheres it:
    var updatedScores = JSON.parse(localStorage.getItem("UpdatedScores")) || [];

    // for later use (in one line), creates empty array
    var updatedScoresNoDuplicates = [];

    // Check if the recent score already exists in the array. Note that it uses the some method that was explained before:
    var isDuplicate = updatedScores.some(function(score) {
        return score.initials === recentScore.initials &&
               score.time === recentScore.time &&
               score.scores === recentScore.scores;
    });

    // If it's not a duplicate, add it to the new array
    if (!isDuplicate) {
        // if no duplicate, add recentScore
        updatedScoresNoDuplicates = [...updatedScores, recentScore];
    } else {
        // if IS duplicate, then don't add the recentScore
        updatedScoresNoDuplicates = updatedScores;
    }

    // save to storage
    localStorage.setItem("UpdatedScores", JSON.stringify(updatedScoresNoDuplicates));
};

// func to display scores:
function displayScores(){

    // creates table elements inside the TABLE element already existing in the html! (specifically somes in handy when we use the clear btn down below and clear all the table, this code here makes sure the titles of the table are still present!)
    table.innerHTML = `                
        <tr>
            <th>Initials</th>
            <th>Time Spent</th>
            <th>Score</th>

        </tr>
        
    `;

    var updatedScores = JSON.parse(localStorage.getItem("UpdatedScores")) || [];

    // Sort the scores in descending order: if scoreB - scoreA = +ve, then scoreB should come first (on top in our case) because scoreB is larger, wehreas if -ve then opposite, and if 0 then makes no difference!
    updatedScores.sort(function(a, b) {
        return b.scores - a.scores;
    });

    // makes sure the rows of recent scores are entered each time a new score is presented!
    for (var i =0; i < updatedScores.length; i++){

        // if the new score line has no "null" value in its initials or scores, then it does add it to the table as a new score, else it does not!
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

// the func that clears all data in local storage and then calls teh displayscores func to display the table titles as mentioned before! While I could have brought that specific code that adds the titles to this side, the current code makes more sense to me! 
function clearScores(event) {
    event.preventDefault();
    if (event.target.classList.contains("clearBtn")) {
      localStorage.clear("UpdatedScores");
      displayScores();
    }
}
  
// basically applies the clear func to the clearBtn!
var clearBtn = document.querySelector("#clearBtn")
clearBtn.addEventListener("click", clearScores);

// my submit button is actually called return, but js does not accept a variable named return due to it being used as a key word for functions etc. Note that once this is clicked, user is returned to the main page!
submit.addEventListener("click", function(event){

    event.preventDefault();

    window.location.href = "./index.html";

    // do not use: makes page inaccissible by back arrow:
    // document.location.replace("./index.html");
});

// overall, this ensures that the functions do not run when I refresh the page, because I had that happen whenever I changed some small steps in the code above. Thus, this makes sure that even if I change some small things, this still applies!
var hasRun = false;

function stopOnSecondReload() {
  if (!hasRun) {
    addRecentScore(); 
    displayScores(); 
    hasRun = true;
  }
}

stopOnSecondReload();
