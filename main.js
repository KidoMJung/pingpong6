var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

// ballx bally
var x= canvas.width/2
var y = canvas.height -35;

var dx = 4;
var dy = -4;
var ballRadius = 10;

// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth)/2;

// paddleMovement
var paddleDx = 7;
var rightPressed;
var leftPressed;

var stopButton =  document.getElementById("stop-game")
stopButton.addEventListener('click', function() {
    window.stop();
})


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        console.log('henk')
        rightPressed = true;
    }
    if(e.keyCode == 37) {
        console.log('henk')
        debugger
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 37) {
        leftPressed = false;
    }
    if(e.keyCode == 39) {
        rightPressed = false;
    }
}
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false)



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0 , Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.width - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    drawBall();
    drawPaddle();

    // boundary right - left
    if(x + dx > canvas.width - ballRadius ||  x + dx < ballRadius ) {
        dx = -dx;
    }
   
    // bouncing ball - boundary - bouncing ball -padd;e
    if (y + dy < ballRadius || 
        (y + dy > canvas.height - ballRadius - paddleHeight  && 
        x + dx > paddleX &&
        x + dx < paddleX + paddleWidth)) {
        dy = -dy;
    } else if (y + dy > canvas.height){
        location.reload();
    }


    
    // movement paddle
    if(leftPressed && paddleX > 0 ) {
        paddleX -= paddleDx;
    }
    if(rightPressed && (canvas.width - paddleX) < canvas.width ) {
        paddleX += paddleDx;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw)
}
requestAnimationFrame(draw)