// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// --- Initial Game State ---
// Paddle dimensions
const playerWidth = 30;
const playerHeight = 180;

// Set initial paddle positions (p1 on the left, p2 on the right)
let p1 = { x: 10, y: canvas.height / 2 - playerHeight / 2 };
let p2 = { x: canvas.width - 10 - playerWidth, y: canvas.height / 2 - playerHeight / 2 };

// Ball state
const ballSize = 35;
let ball = { x: canvas.width / 2 - ballSize / 2, y: canvas.height / 2 - ballSize / 2 };

// Initial scores
let p1Score = 0;
let p2Score = 0;

// Object to track pressed keys
const pressedKeys = {};
window.addEventListener('keydown', (e) => {
  pressedKeys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  pressedKeys[e.key] = false;
});

// --- Animation Loop ---
function animate() {
  // Call the gameLoop function to update game state (logic only, no DOM manipulation)
  const updated = gameLoop(p1, p2, playerWidth, playerHeight, ball, ballSize, pressedKeys, canvas.width, canvas.height, p1Score, p2Score);
  p1 = updated.p1;
  p2 = updated.p2;
  ball = updated.ball;
  p1Score = updated.p1Score;
  p2Score = updated.p2Score;
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw paddles and ball
  ctx.fillStyle = 'white';
  ctx.fillRect(p1.x, p1.y, playerWidth, playerHeight);
  ctx.fillRect(p2.x, p2.y, playerWidth, playerHeight);
  ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
  
  // Render player scores
  ctx.font = "40px Arial";
  ctx.fillText(`${p1Score}:${p2Score} `, canvas.width/2 - 50, 50);
  
  requestAnimationFrame(animate);
}

// Start the game animation loop
animate();
