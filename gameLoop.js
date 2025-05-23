/**
 * Game loop function for a Pong game.
 *
 * Parameters:
 * - p1: Object representing player 1 (left paddle) with properties { x, y }.
 * - p2: Object representing player 2 (right paddle) with properties { x, y }.
 * - playerWidth: Width of a paddle.
 * - playerHeight: Height of a paddle.
 * - ball: Object representing the ball with properties { x, y }.
 * - ballSize: Size (width/height) of the ball.
 * - pressedKeys: An object containing the current state of key presses,
 *                e.g., { 'w': true, 's': false, 'ArrowUp': true, 'ArrowDown': false }.
 * - screenWidth: Width of the playing area (canvas).
 * - screenHeight: Height of the playing area (canvas).
 * - p1Score: Score for player 1.
 * - p2Score: Score for player 2.
 *
 * What the function does:
 * 1. **Paddle Movement:**  
 *    - Moves player 1 up when 'w' is pressed and down when 's' is pressed.
 *    - Moves player 2 up when 'ArrowUp' is pressed and down when 'ArrowDown' is pressed.
 *    - Clamps paddle positions between 0 and (screenHeight - playerHeight).
 *
 * 2. **Ball Movement:**  
 *    - Updates the ball’s position using internal helper velocities (ballDx, ballDy).
 *    - Reverses the vertical velocity if the ball hits the top or bottom wall.
 *
 * 3. **Paddle Collision:**  
 *    - If the ball collides with a paddle, reverses its horizontal direction.
 *
 * 4. **Scoring:**  
 *    - If the ball goes off the left edge, player 2 scores.
 *    - If the ball goes off the right edge, player 1 scores.
 *    - In either case, the ball is reset to the center.
 *
 * Returns:
 * An object containing the updated game state:
 * { ball, p1, p2, p1Score, p2Score }.
 */

let ballSpeedX = -5;
let ballSpeedY = 5;



function gameLoop(p1, p2, playerWidth, playerHeight, ball, ballSize, pressedKeys, screenWidth, screenHeight, p1Score, p2Score) {

    let ballX = ball.x + ballSpeedX;
    let ballY = ball.y + ballSpeedY;

    console.log(pressedKeys);
    let newp1Y = p1.y;
    let newp2Y = p2.y;

    if(pressedKeys["w"] === true) {
        newp1Y -= 10; 
    }

    if(pressedKeys["s"] === true) {
        newp1Y += 10; 
    }

    if(pressedKeys["ArrowUp"] === true) {
        newp2Y -= 10; 
    }

    if(pressedKeys["ArrowDown"] === true) {
        newp2Y += 10; 
    }

    

    if (ball.y + ballSize >= screenHeight) {
        ballSpeedY = -5;
    }

    
    if (ball.y <= 0) {
        ballSpeedY = +5;
    }

    if ( ball.x >= p1.x && ball.x <= playerWidth + p1.x){

        if ((ball.y >= p1.y && ball.y <= playerHeight + p1.y) || (ball.y + ballSize >= p1.y && ball.y <= p1.y)){
            ballSpeedX = 5;
        }
    }

     if ( ball.x + ballSize >= p2.x && ball.x <= playerWidth + p2.x){

        if ((ball.y >= p2.y && ball.y <= playerHeight + p2.y) || (ball.y + ballSize >= p2.y && ball.y <= p2.y)){
            ballSpeedX = -5;
        }
    }

     if (ball.x < 0) {
    p2Score++;
     ballX = screenWidth / 2 - ballSize / 2;
        ballY = screenHeight / 2 - ballSize / 2;
        ballSpeedX = 5;
        ballSpeedY = 5;
     }

     if (ball.x + ballSize > screenWidth) {
    p1Score++;
     ballX = screenWidth / 2 - ballSize / 2;
        ballY = screenHeight / 2 - ballSize / 2;
        ballSpeedX = -5; s
        ballSpeedY = 5;
    
     }
 

    let newp1 = {x: p1.x, y: newp1Y};
    let newp2 = {x: p2.x, y: newp2Y};
    let newball = {x: ballX, y: ballY};





    return { ball: newball, p1: newp1, p2: newp2, p1Score: p1Score, p2Score: p2Score };
}
