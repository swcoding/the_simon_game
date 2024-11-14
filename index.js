var gameStart = false;
var userInput = Array();
var level = 1;
var answerSequence = [];
var levelTitle = `Level ${level}`;
var correctRecord = Array(); // for each level

// 1. New game
$(document).on("keydown", (event) => {
  // change the title
  $("#level-title").text(levelTitle);
  gameStart = true;
  answerSequence = generateSequence().slice(0, 10);
  displaySequence(answerSequence, level);

  $(".btn").on("click", function (event) {
    // get the color of button that user clicked
    colorClicked = $(this).attr("id");
    pressed("#" + colorClicked);

    // play the music
    var audio = new Audio(`sounds/${colorClicked}.mp3`);
    audio.play();

    userInput.push(colorClicked);
    console.log(userInput);

    checkAnswer(userInput, answerSequence);
  });
});

function checkAnswer(input, sequence) {
  answer = sequence.slice(0, level);
  console.log("sequence: " + sequence);
  console.log(`userInput: ${input}`);
  console.log(`answer: ${answer}`);

  // check condition
  // Each level has n clicks, all clicks should be correct,
  // then goes in to next level

  isCorrect = userInput.every((e, i) => e === answer[i]); // check single click
  correctRecord.push(isCorrect);
  nextLevel =
    correctRecord.every((e) => e === true) &&
    correctRecord.filter(Boolean).length === level;

  console.log("correctRecord: " + correctRecord);
  console.log("nextLevel: " + nextLevel);
  if (nextLevel) {
    console.log("correct!");
    level += 1;
    setTimeout(() => {
      displaySequence(sequence, level);
    }, 300);

    // change title
    $("#level-title").text(`Level ${level}`);
    // refresh userInput
    userInput = Array();
    correctRecord = Array();
  }

  // game over
  if (!isCorrect) {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    // change background color to red
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 1000);
    // change title
    $("#level-title").text("Game over, press any key to start");

    // refresh all variable
    userInput = Array();
    correctRecord = Array();
    level = 1;
  }
}

function displaySequence(sequence, level) {
  // display the {i}th element in the sequence
  setTimeout(() => {
    tempColorId = "#" + sequence[level - 1];
    console.log("sequence:" + sequence);
    console.log("level: " + level);
    console.log("displaySequence:" + tempColorId);
    pressed(tempColorId);
  }, 300);
}

function pressed(selector) {
  $(selector).addClass("pressed");
  setTimeout(() => {
    $(selector).removeClass("pressed");
  }, 100);
}

function generateSequence() {
  let sequence = Array(30).fill(0);

  sequence = sequence.map((element) => {
    element = pickColor();
    return element;
  });
  return sequence;
}

function pickColor() {
  var random = Math.random() * 4;
  random = Math.floor(random) + 1;
  switch (random) {
    case 1:
      var color = "red";
      break;
    case 2:
      var color = "blue";
      break;
    case 3:
      var color = "yellow";
      break;
    case 4:
      var color = "green";
      break;
  }
  return color;
}
