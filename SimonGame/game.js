var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var hasStarted = false;

var level = 0;

var index = 0;

var wrongAnswer = false;

$(".btn").click(function() {
    if (hasStarted) {
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(index);
        if (wrongAnswer) {
            var audio = new Audio("sounds/wrong.mp3");
            setTimeout(function() {
                audio.play();
                $("body").addClass("game-over");
                $("h1").text("Game Over, Press Any Key to Restart");
            }, 200);
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 400);
            startOver();
        } else if (index + 1 === level) {
            index = 0;
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence()
            }, 1000);
        
        } 
        else {
            index++;
        }
        
        
    }
})

$(document).keydown(function() {
    if(!hasStarted) {
        hasStarted = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
})

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        index++;
    } else {
        wrongAnswer = true;
    }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    hasStarted = false;
    level = 0;
    index = 0;
    wrongAnswer = false;
}