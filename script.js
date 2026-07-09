let player = document.getElementById("player");
let enemy = document.getElementById("enemy");
let scoreText = document.getElementById("score");

let playerLeft = 125;
let enemyTop = -100;
let enemyLeft = 50;
let score = 0;
let gameRunning = false;
let gameLoop;

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  score = 0;
  enemyTop = -100;
  enemyLeft = Math.floor(Math.random() * 250);

  gameLoop = setInterval(() => {
    enemyTop += 5;
    enemy.style.top = enemyTop + "px";
    enemy.style.left = enemyLeft + "px";

    if (enemyTop > 500) {
      enemyTop = -100;
      enemyLeft = Math.floor(Math.random() * 250);
      score++;
      scoreText.innerText = "Score: " + score;
    }

    checkCrash();
  }, 30);
}

function moveLeft() {
  if (playerLeft > 0) {
    playerLeft -= 50;
    player.style.left = playerLeft + "px";
  }
}

function moveRight() {
  if (playerLeft < 250) {
    playerLeft += 50;
    player.style.left = playerLeft + "px";
  }
}

function checkCrash() {
  let playerRect = player.getBoundingClientRect();
  let enemyRect = enemy.getBoundingClientRect();

  if (
    playerRect.left < enemyRect.right &&
    playerRect.right > enemyRect.left &&
    playerRect.top < enemyRect.bottom &&
    playerRect.bottom > enemyRect.top
  ) {
    clearInterval(gameLoop);
    gameRunning = false;
    alert("Game Over! Score: " + score);
  }
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});
