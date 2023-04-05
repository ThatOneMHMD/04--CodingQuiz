// to set the score to whatever the user got before!
var scoreNumber = localStorage.getItem("Score");
document.querySelector('#scoreNumber').textContent = scoreNumber;

var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");

submit.addEventListener("click",function(event){

    event.preventDefault;

    var storeInitials = initials.value.trim();
    localStorage.setItem("Initials", JSON.stringify(storeInitials));

    if (initials.value == 0) {

        alert("You have yet to enter your intitials!");

    } else {

        window.location.href = "./scoreList.html";
    }

});

initials.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      submit.click();
    }
});

// Checkpoint!!