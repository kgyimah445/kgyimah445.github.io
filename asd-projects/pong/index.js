/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  // Game Item Objects
  var rightPaddle = gameFactory("#rightPaddle", "rightPaddle");

  var leftPaddle = gameFactory("#leftPaddle", "leftPaddle");

  var ball = gameFactory("#ball", "ball");

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); 
  $(document).on("keyup", handleKeyUp);// change 'eventType' to the type of event you want to handle
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  var KEYCODE = {
    DOWN: 40,
    UP: 38,
    W: 87,
    S: 83,
  };

  function handleKeyDown(event) {
    var keycode = event.which;
    console.log(keycode);

    if (keycode === KEYCODE.DOWN) {
      console.log("DOWN pressed");
      rightPaddle.speedY = 3;
    }
    if (keycode === KEYCODE.UP) {
      console.log("UP pressed");
      rightPaddle.speedY = -3;
    }  
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY = -3;
    }  if (keycode === KEYCODE.S) {
      leftPaddle.speedY = 3;
    }
  } 

  function handleKeyUp(event) {
    var keycode = event.which;
    console.log(keycode);

    if (keycode === KEYCODE.DOWN) {
      
      rightPaddle.speedY = 0;
    }
    if (keycode === KEYCODE.UP) {
      
      rightPaddle.speedY = 0;
    } if (keycode === KEYCODE.W) {
      leftPaddle.speedY = 0;
    } if (keycode === KEYCODE.S) {
      leftPaddle.speedY = 0;
    }
  }

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    moveObject(leftPaddle);
    moveObject(rightPaddle);

    wallCollision(ball);

    wallCollision(rightPaddle);
    
     wallCollision(leftPaddle);
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
  function gameFactory(id, name) {
    var name = {};
    name.id = id;

    name.x = parseFloat($(id).css("left"));
    name.y = parseFloat($(id).css("top"));

    name.width = $(id).width();
    name.height = $(id).height();

    name.speedX = 0;
    name.speedY = 0;

    return name;
  }

  function startBall() {
    randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    randomNum2 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);

    


    ball.speedX = randomNum;
    ball.speedY = randomNum2;
  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;


    
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  function wallCollision(obj){
    if (obj.x > BOARD_WIDTH) {
      obj.speedX = 0;
      obj.speedY = 0;
    }
    if (obj.y > BOARD_HEIGHT) {
      obj.speedX = 0;
      obj.speedY = 0;
    }
    
    if (obj.x + obj.width > BOARD_WIDTH) {
      obj.speedX = 0;
      obj.speedY = 0;
    }
    if (obj.y + obj.height > BOARD_HEIGHT) {
      obj.speedX = 0;
      obj.speedY = 0;
    }
  }
}
