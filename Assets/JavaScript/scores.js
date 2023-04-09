// gets and displays the score from the current run
var scoreNumber = localStorage.getItem("Score");
document.querySelector('#scoreNumber').textContent = scoreNumber;

// creates the variables for the input box (initials) and the submit btn:
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");

// one big event listener for clicking the submit button 
submit.addEventListener("click", function(event) {
  
  // don't want it to refresh page or whatever is the default action
  event.preventDefault();

  // variable for the value entered in the input box, supposedly initials that are less tha 5 characters (according to the html set limitations)
  var storeInitials = initials.value.trim();
  
  // creates a variable where the scores, initials, and timer are gathered. If it does not exists, it simply creates an empty array
  var updatedScores = JSON.parse(localStorage.getItem("UpdatedScores")) || [];

  // var to check if initials already exist in local storage: the "some" method returns true ot false indicating if the "initials" already exist in the updated scores array we created previously. If it does exist: then it gives true, if not, it's false.
  var isDuplicate = updatedScores.some(function(score) {
    return score.initials === storeInitials;
  });

  // if it does exist, giving us if(true), then give the mentioned alert!
  if (isDuplicate) {
    alert("Initials already exist!");
    return;
  }

  // saves the inputed initials into storage once they are not duplicates
  localStorage.setItem("Initials", JSON.stringify(storeInitials));

  // if the user inputs nothing, it gives this alert. Otherwise, if everything is good, it trasnfer users into the score list webpage!
  if (initials.value == 0) {
    alert("You have yet to enter your initials!");
  } else {
    window.location.href = "./scoreList.html";
  }
});

// a simple event listener that makes the key "enter" apply the func above as though we clicked on submit! This was simply done because I was too lazy to type initials and then move my hand to the mouse to click submit...
initials.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    submit.click();
  }
});
