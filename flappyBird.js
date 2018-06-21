
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



// //loading images to the scene

var bird = new Image();
var bcgr = new Image();
var bottom = new Image();
var pipeUp = new Image();
var pipeDown = new Image();

bird.src = "images/bird.png";
bcgr.src = "images/bcgr.png";
bottom.src = "images/bottom.png";
pipeUp.src = "images/pipeUp.png";
pipeDown.src = "images/pipeDown.png";


//constant variable 
var space = 100;
var constant = pipeUp.height + space; 

// bird image coordinates by x and y
var birdX = 10;
var birdY = 170;

// variable gravity
var gravity = 0.7;


var score = 0;

// audo assets
var fly = new Audio();
var scr = new Audio();

fly.src = "sounds/fly.mp3";
scr.src = "sounds/score.mp3";


//on key down
document.addEventListener("keydown", moveUp);

// moveUp functiron position changing 20px to the top
function moveUp() {
    birdY -= 40;
    fly.play();
}

//pipe coordinates
//crating an empty array
var pipe = [];

pipe[0]={
    x : cvs.width,
    y : 0
};


//draw images function

function draw(){
    
     // draw background image of the same size as canvas
    ctx.drawImage(bcgr,0,0);
    
    // for loop 
    for(var i=0; i < pipe.length; i++){
        
         // draw top pipe
    ctx.drawImage(pipeUp, pipe[i].x ,pipe[i].y);
    
    //draw bottom pipe 
    ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + constant);
        
    pipe[i].x--;
        
        if(pipe[i].x== 80){
            
            pipe.push({
                
                x: cvs.width,
                y: Math.floor(Math.random()* pipeUp.height)-pipeUp.height
            });
        }
        
        // collision detection 
        
        if(birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeUp.width  && (birdY <= pipe[i].y + pipeUp.height || birdY + bird.height >= pipe[i].y + constant)|| birdY + bird.height >= cvs.height- bottom.height ){
            
            location.reload();
           }
        
        if(pipe[i].x ==5){
            score++;
            scr.play();
        }
        
    }
    
    // draw bottom gruound
    ctx.drawImage(bottom, 0, cvs.height - bottom.height);
    
    //draw bird image
    ctx.drawImage(bird, birdX, birdY);
    
    birdY += gravity;
    
    ctx.fillStyle="#000";
    ctx.font="20px Verdana";
    ctx.fillText("Score: " + score, 10,cvs.height-20);
    
    // animation frame created
    requestAnimationFrame(draw);
    
}

draw();
