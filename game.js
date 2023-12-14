var sequence = [];
var playerCounter = 0;
var speed = 750;
var gameState = false;

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}

function advanceSequence() {
  var nextItem = Math.floor(Math.random() * 4 + 1);
  switch (nextItem) {
    case 1:
      sequence.push("green");
      break;
    case 2: 
      sequence.push("red");
      break;
    case 3: 
      sequence.push("yellow");
      break;
    case 4: 
      sequence.push("blue");
      break;
    default: 
      break;
  }
  //console.log(sequence);
}

async function displaySequence(spd) {
  var l = sequence.length;
  for (var i = 0; i < l; i++)
  {
    var col = sequence[i];
    var btn = $("#" + col);
    btn.fadeOut(100).fadeIn(100);
    playButtonSound(col);
    await delay(speed);
  }
}

function advanceAndDisplaySequence(spd) {
  advanceSequence();
  displaySequence(spd);
}

function checkButtonPress(buttonName) {
  return sequence[playerCounter] === buttonName;
}

function resetGame()
{
  gameState = false;
  sequence = [];
  playerCounter = 0;
  //console.log("game has been reset");
}

function buttonAnim(key) {
  document.querySelector("#" + key).classList.toggle("pressed");
  setTimeout(function () {
    document.querySelector("#" + key).classList.toggle("pressed");
  }, 100);
}

function endAnim() {
  var a = new Audio("./sounds/wrong.mp3");
  a.play();
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
}

function playButtonSound(colour)
{
  var a = new Audio("./sounds/" + colour + ".mp3");
  a.play();
}

$(".btn").on("click", async function () {
  var thisBtnID = this.id;
  buttonAnim(thisBtnID);
  playButtonSound(thisBtnID);
  if (gameState)
  {
    if (checkButtonPress(thisBtnID))
    {
      playerCounter++;
      //console.log(playerCounter);
      if (playerCounter >= sequence.length)
      {
        await delay(speed);
        $("h1").text("Level " + (sequence.length + 1));
        advanceAndDisplaySequence(speed);
        playerCounter = 0;
      }
    }
    else {
      //console.log("u die");
      endAnim();
      resetGame();
    }
  }
  else
  {
    resetGame();
    gameState = true;
    await delay(speed);
    $("h1").text("Level " + (sequence.length + 1));
    advanceAndDisplaySequence(speed);
  }
})


