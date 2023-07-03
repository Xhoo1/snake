//// Board  Variables /////
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//// Snake Variables /////
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;

///// Food Variables /////
let foodX;
let foodY;

let gameOver = false;

//// Snake Body /////
let snakeBody = [];

//// Board Function /////
window.onload = function() {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // This is used to edit the board///
  placeFood();
  document.addEventListener("keyup", changeDirection);

  // Button events
  document.getElementById("up").addEventListener("click", function() {
    changeDirection("ArrowUp");
  });
  document.getElementById("down").addEventListener("click", function() {
    changeDirection("ArrowDown");
  });
  document.getElementById("left").addEventListener("click", function() {
    changeDirection("ArrowLeft");
  });
  document.getElementById("right").addEventListener("click", function() {
    changeDirection("ArrowRight");
  });

  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }

  /// Board Updates///
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  /// Food Updates ///
  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  //// Snake Updates////
  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  /// Food Updates ///
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    document.querySelector("h1").innerHTML = "Game Over!";
    document.querySelector("h1").style.color = "red";
  }

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);
}

function changeDirection(code) {
  if (code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

document.getElementById("newGame").addEventListener("click", function() {
  location.reload();
});
