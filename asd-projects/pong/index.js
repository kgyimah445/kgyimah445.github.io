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
  let player1Score = 0;
  let player2Score = 0;
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown);
  $(document).on("keyup", handleKeyUp); // change 'eventType' to the type of event you want to handle
  startBall();
  $("#reset-button").on("click", resetGame);
  $(leftPaddle.id).css("left", 0);
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
      rightPaddle.speedY = 5;
    }
    if (keycode === KEYCODE.UP) {
      console.log("UP pressed");
      rightPaddle.speedY = -5;
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY = -5;
    }
    if (keycode === KEYCODE.S) {
      leftPaddle.speedY = 5;
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
    }
    if (keycode === KEYCODE.W) {
      leftPaddle.speedY = 0;
    }
    if (keycode === KEYCODE.S) {
      leftPaddle.speedY = 0;
    }
  }

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // Move the ball and paddles
    moveObject(ball);
    moveObject(leftPaddle);
    moveObject(rightPaddle);

    // Check for collisions with the walls
    wallCollision(ball);
    wallCollision(rightPaddle);
    wallCollision(leftPaddle);

    // Check for collisions with the paddles
    paddleCollision(ball, leftPaddle);
    paddleCollision(ball, rightPaddle);

    // Update the scoreboard
    $("#scoreboard").text(player1Score + ":" + player2Score);

    // End The Game
    if (player1Score === 5 || player2Score === 5) {
      endGame();
    }
  
  }
  /* 
  Called in response to events.
  */
  function handleEvent(event) {}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();

    resetGame();
  }
  function gameFactory(id, name) {
    var gameObject = {};
    gameObject.id = id;
    gameObject.name = name;
    gameObject.x = $(id).offset().left;
    gameObject.y = $(id).offset().top;
    gameObject.width = $(id).width();
    gameObject.height = $(id).height();

    gameObject.speedX = 0;
    gameObject.speedY = 0;

    return gameObject;
  }

  function startBall() {
    randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    randomNum2 = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);

    ball.speedX = randomNum;
    ball.speedY = randomNum2;

    $(ball.id).css("left", 210);
    $(ball.id).css("top", 170);
  }

  function moveObject(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;

    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }
  function wallCollision(gameItem) {
    if (gameItem.id === "#ball") {
      if (gameItem.x + gameItem.width >= BOARD_WIDTH) {
        player1Score++;
        console.log(player1Score);
        resetBall();
      }
      if (gameItem.x <= 0) {
        player2Score++;
        console.log(player2Score);
        resetBall();
      }else if (
        gameItem.y <= 0 ||
        gameItem.y + gameItem.height >= BOARD_HEIGHT
      ) {
        gameItem.speedY *= -1;

        
      }
      //scoring rehaul
      

      if (
        gameItem.y + gameItem.speedY < 0 ||
        gameItem.y + gameItem.height + gameItem.speedY > BOARD_HEIGHT
      ) {
        gameItem.speedY = -gameItem.speedY;
      }

      if (gameItem.name === "leftPaddle" || gameItem.name === "rightPaddle") {
        if (
          gameItem.y + gameItem.speedY < 0 ||
          gameItem.y + gameItem.height + gameItem.speedY > BOARD_HEIGHT
        ) {
          gameItem.speedY = 0;
        }
      }
    }
  }

  function resetBall() {
    ball.x = BOARD_WIDTH / 2 - ball.width / 2;
    ball.y = BOARD_HEIGHT / 2 - ball.height / 2;

    ball.speedX = 0;
    ball.speedY = 0;

    $("#scoreboard").text(player1Score + ":" + player2Score);

    setTimeout(startBall, 2000);
  }
  function resetGame() {
    clearInterval(interval);

    $(leftPaddle.id).css("left", 0);

    $(ball.id).css("left", 210);
    $(ball.id).css("top", 170);
   $(leftPaddle.id).css("top", BOARD_HEIGHT / 2);
  $(rightPaddle.id).css("top", BOARD_HEIGHT / 2);

    player1Score = 0;
    player2Score = 0;

    interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);

    resetBall();
  }

  function paddleCollision(ball, paddle) {
    if (
      ball.x < paddle.x + paddle.width &&
      ball.x + ball.width > paddle.x &&
      ball.y < paddle.y + paddle.height &&
      ball.y + ball.height > paddle.y
    ) {
      ball.speedX = -ball.speedX;
    }
  }
}
