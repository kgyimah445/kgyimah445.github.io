/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var positionX = 0;
  var speedX = 1;
  var positionY = 0;
  var speedY = 1;
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "LEFT": 37,
  };
  var KEY = {
    "RIGHT": 39,
  };
  var KEY = {
    "UP": 38,
  };
  var KEY = {
    "DOWN": 40,
  };
  // Game Item Objects
  $("#walker").css("left", positionX);
  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {}

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    console.log("Key pressed: " + event.which);

    if (event.which === 37) {
      console.log("LEFT pressed");
      speedX = -1;
      positionX = positionX += speedX;
  $("#walker").css("left", positionX);
  console.log(positionX);
  }
  if (event.which === 40) {
    console.log("DOWN pressed");
    speedY = 1;
    positionY += speedY;
    $("#walker").css("top", positionY);
    console.log(positionY);
}
if (event.which === 39) {
  console.log("RIGHT pressed");
  speedX = 1;
  positionX += speedX;
  $("#walker").css("left", positionX);
  console.log(positionX);
}
if (event.which === 38) {
  console.log("UP pressed");
  speedY = -1;
    positionY += speedY;
    $("#walker").css("top", positionY);
    console.log(positionY);
}



  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  function repositionGameItem(){


  }

  function redrawGameItem(){
    $("#walker").css("left", positionX);

  }
}
