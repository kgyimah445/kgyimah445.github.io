/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function handleKeyDown(event) {
    console.log("Key pressed: " + event.which);
  
    if (event.which === 40) {
      console.log("DOWN pressed");
      
  
  }
  if (event.which === 38) {
    console.log("UP pressed");
   
  }
  
  }
  


  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
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
var rightPaddle = gameFactory("#rightPaddle", "rightPaddle");

var leftPaddle = gameFactory("#leftPaddle", "leftPaddle");

var ball = gameFactory("#ball", "ball");




  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);                         // change 'eventType' to the type of event you want to handle
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var KEYCODE = {
    DOWN: 40,
    UP: 38
  }
  
  function handleKeyDown(event) {
    var keycode = event.which;
    console.log(keycode);
    
    if (keycode === KEYCODE.DOWN) {
      console.log("DOWN pressed");
      rightPaddle.speedX = 5;
    }
    if (keycode === KEYCODE.UP) {
      console.log("UP pressed");
    }
  
  }


  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

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
function gameFactory(id, name){
  var name = {};
  name.id = id;

name.x = parseFloat($("#id").css("left"));
name.y = parseFloat($("#id").css("top"));

name.width =  $("#id").width();
name.height = $("#id").width();

name.speedX = 0;
name.speedY = 0;

return name;
}
}


function startBall() {
  randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  ball.speedX = randomNum;
  ball.sppedY = randomNum;
}

function moveObject(obj) {
obj.x += obj.speedX;
obj.y += obj.speedY;

}

