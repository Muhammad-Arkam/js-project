const board = document.querySelector(".board");
const startBtn = document.querySelector(".btn_start");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start_game");
const gameOverModal = document.querySelector(".game_over");
const restartBtn = document.querySelector(".btn_restart");

const HighScoreElement = document.querySelector("#high_score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

let highScore = localStorage.getItem("highScore") || 0;
HighScoreElement.innerText = highScore;

let score = 0;
let time = `00-00`;

const blockwidth = 50;
const blockheight = 50;

const cols = Math.floor(board.clientWidth / blockwidth);
const rows = Math.floor(board.clientHeight / blockheight);

let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

let intervalId = null;
let timerIntervalId = null;

const blocks = [];
let snake = [
  {
    x: 1,
    y: 3,
  },
];
let direction = "down";

// for(let i=0; i<rows * cols; i++){
//     const block = document.createElement("div");
//     block.classList.add("block");
//     board.appendChild(block);
// }

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${row}-${col}`;
    blocks[`${row}-${col}`] = block;
  }
}

function render() {
  blocks[`${food.x}-${food.y}`].classList.add("food");

  let head = null;
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    // alert("game over");
    clearInterval(intervalId);

    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";

    return;
  }
  //food consume logic
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);

    score += 10;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  snake.forEach((segments) => {
    blocks[`${segments.x}-${segments.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach((segments) => {
    blocks[`${segments.x}-${segments.y}`].classList.add("fill");
  });
}

startBtn.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);

  timerIntervalId = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);
    if(sec == 59){
      min += 1;
      sec = 0;
    }else {
      sec += 1;
    }
    time = `${min}-${sec}`;
    timeElement.innerText = time;
  }, 1000);

});

restartBtn.addEventListener("click", restartGame);

function restartGame() {
  direction = "down";
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segments) => {
    blocks[`${segments.x}-${segments.y}`].classList.remove("fill");
  });

  score = 0;
  time = `00-00`;

  scoreElement.innerText = score;
  HighScoreElement.innerText = highScore;

  timeElement.innerText = time;

  modal.style.display = "none";
  snake = [
    {
      x: 1,
      y: 3,
    },
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  intervalId = setInterval(() => {
    render();
  }, 300);
}

// intervalId = setInterval(() => {
//   render();
// }, 300);

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  }
});
