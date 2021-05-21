var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  userClickedPattern = [];

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  checkState();
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (started) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (gamePattern.length === userClickedPattern.length) {
        setTimeout(function() {
          nextSequence()
        }, 600);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkState() {
  if (!started && gamePattern.length !== 0) {
    $("#level-title").text("oops, something went Wrong! Reload the Page");
    $("body").addClass("game-over");
  }
}
