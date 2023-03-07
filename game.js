var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var start = false;

$(document).keypress(function() {
    if (!start) {
        $("#level-title").text("Level  "+level);
        nextSequence();
        start = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");

        $('#level-title').text("Game Over, Press Any Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
          }, 200);

          startOver();
    }

}



function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level  "+level);

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);
    var randomChosenColour = colors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}