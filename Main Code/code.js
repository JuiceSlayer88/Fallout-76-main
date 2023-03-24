
//kobble kanvass
const ctx = document.getElementById("canvasGFX").getContext("2d");
const preOutput = document.getElementById("preOutput")


// Setting up a shitpost


// Draw whatever else over top of it on the canvas.
//setter up canvass
let width  = canvasGFX.width;
let height = canvasGFX.height;

// Gravity
let gravity = 0.5;
let gravitySpeed = 0;

let gravity2 = 0.1;
let gravitySpeed2 = 0;

// Jumping
let Jump = false;
let JumpA = 0;

let Jump2 = false;
let JumpB = 0;

// Movement Right
let Mright = false;

// set health
let health1 = 100;
let health2 = 100;

// Define Border
borderY = 344;
borderX = 990;

// Player Speed:
let moveSpeedp1Y = 0;
let moveSpeedp1X = 0;

let moveSpeedp2Y = 0;
let moveSpeedp2X = 0;

// Setting up Attack 

let player1attack = false; 

let player1kick = false; 

 
 

let player2punch = false; 

let player2kick = false; 

//keys



let Player1Up     = false;
let Player1Down   = false;
let Player1Left   = false;
let Player1Right  = false;
//e
let Restart = false;



document.onkeydown = function( event ) {  

    if      (event.key == "w")            Player1Up     = true;  
    else if (event.key == "s")            Player1Down   = true;  
    if      (event.key == "a")            Player1Left   = true;  
    else if (event.key == "d")            Player1Right  = true; 

    if      (event.key == "e" && player1attack == false)    player1attack = true; 
    if      (event.key == "q" && player1kick == false)      player1kick   = true; 

    if      (event.key == "r")   Restart = true;
    

}


document.onkeyup = function( event ) { 
    if      (event.key == "w")            Player1Up     = false;  
    else if (event.key == "s")            Player1Down   = false;  
    if      (event.key == "a")            Player1Left   = false;  
    else if (event.key == "d")            Player1Right  = false;  
    

} 



// Player Position
let player1X                   = 200;
let player1Y                   = 200;

let player2X                   = 500;
let player2Y                   = 100;

// Player Movement
let d1x                        = 0;
let d1y                        = 0;

let d2x                        = 0;
let d2y                        = 0;

// ?!?
let step1                      = 2;

let step2                      = 2;

// Define Player
let player1Width               = -80;
let player1Height              = 40;

let player2Width               = 10;
let player2Height              = 10;

// Define Player animation
let player1AnimationState      = 0;
let player1AnimationIndex      = 0;
let player1AnimationIndexFloat = 0.0;
let player1Animation           = [
    [        0,],  // :0 står stille
    [        0,],  // :1 går venstre 
    [        0,],  // :2 går høyre
    [        0,],  // :6 hopper opp
    [        0,],  // :3 fight venstre
    [        0,],  // :4 fight høyre
    [        0,],  // :5 faller ned 

];

// Define Player Animation
let player2AnimationState      = 0;
let player2AnimationIndex      = 0;
let player2AnimationIndexFloat = 0.0;
let player2Animation           = [
    [        0,],  // :0 står stille
    [        0,],  // :1 går venstre 
    [        0,],  // :2 går høyre
    [        0,],  // :6 hopper opp
    [        0,],  // :3 fight venstre
    [        0,],  // :4 fight høyre
    [        0,],  // :5 faller ned 

];
let Player1AnimationFPS = 4;
//player 1 sprites
let spriteSheetURL = "";
let spriteSheetRows = 4;
let spriteSheetColumns1 = 4;
let spriteWidth;
let spriteHeight;
let imgSpriteSheet = new Image();
imgSpriteSheet.src = spriteSheetURL;
imgSpriteSheet.onload = initialize;


function initialize(){
    spriteWidth = imgSpriteSheet.width/spriteSheetColumns1;
    spriteHeight = imgSpriteSheet.height/spriteSheetRows;
    game();
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  
  async function test() {
    console.log('start timer');
    await delay(1000);
    console.log('after 1 second');
  }
  
  test();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Gameloop and player
let lastTime  = Date.now();
function Gameloop(){

    let timeNow  = Date.now();
    let deltatime = (timeNow - lastTime)/1700
    lastTime = timeNow;

       //control
       dx = 0;
       dy = 1;
       if (Player1Left  )   dx = -4;
       if (Player1Right )   dx =  4;
       if (Player1Up    )   dy = -8;
       if (Player1Down  )   dy =  4-dy;
   
       //movement
       player1X += dx;
       player1Y += dy; 

       
     

    //Hitbox for Player 1
    let pos = [player1X, player1Y, player1Height, player1Width];
    // Ctx for Player 1 
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillRect(player1X, player1Y, player1Height, player1Width);
    ctx.fillStyle = "gold" 


    // Hitbox for Player 2
    let pos2 = [player2X, player2Y, player2Height, player2Width];
    // Ctx for Player 2
    ctx.fillRect(player2X, player2Y, player2Height, player2Width);
  
    

// Movement and Movement Speed
    player1X += d1x;
    player1Y += d1y;
    d1x += moveSpeedp1X;
    d1y += moveSpeedp1Y;

    player2X += d2x;
    player2Y += d2y;
    d2x += moveSpeedp2X;
    d2y += moveSpeedp2Y;


// Gravity

// Give players the power of gravity
    gravitySpeed += gravity;
    gravitySpeed2 += gravity2;

    player1X += d1x;
    player1Y += d1y + gravitySpeed;

    player2X += d2x;
    player2Y += d2y + gravitySpeed2;

    if(player1Y > 340){
        gravity == 0;
        gravitySpeed == 0;
    } 

    if(player2Y > 340){
        gravity2 == 0;
        gravitySpeed2 == 0;
    } 

// Make gravity stop if players are at rock bottom 
    let rockbottom = 340;
    if (player1Y > rockbottom) {
        player1Y = rockbottom;
        gravitySpeed = 0;
    }

    if(player2Y > rockbottom){
        player2Y = rockbottom;
        gravitySpeed2 = 0;
    } 

// New Border Collision
// let leftborder = -7;
// if (player1X > leftborder){
//     player1X = leftborder;
// } 

// Jump for Players
    if(Jump == true) 
    {
        player1Y += -20;
        JumpA += 5;
    } 
    if(JumpA >= 10)
    {
        Jump = false;
        JumpA = 0;
    } 
    if(Jump2 == true) {
        player2Y += -20;
        JumpB += 5;
    } 
    if(JumpB >= 10) {
        Jump2 = false;
        JumpB = 0;
    } 


// Border Collision for Player one
if (player1X+d1x > borderX) {
    player1X = 990;
    d1x = 0;
} 
else if (player1X+d1x < 0) {
    player1X = 0;
    d1x = 0;
} 
// Kollisjoner med y
else if (player1Y+d1y > borderY) {
    Player1Up     = false;
} 
else if (player1Y+d1y < 0) {
    Player1Up   = false;
} 

console.log(Player1Up)
console.log(player1X)





// Border Collision for Player Two
if (player2X+d2x > borderX)  {
    d2x *= -0.1;
} 
else if (player2X+d2x < 0){
    d2x *= 0.1;
} 
else if (player2Y+d2y > borderY){
    d2y *= 0.1;
} 
else if(player2Y+d2y < 0){
    d2y *= 0.1;
} 


// Punch for player 1 

if(player1X + player1Width + 5 >= player2X  && 

    player1X <= player2X + player2Width && 
 
    player1Y + player1Height >= player2Y  &&   
 
    player1Y <= player2Y + player2Height && player1attack == true){ 
 
     if(player1attack = true)  { 
 
         setTimeout(() => { 
 
             player1attack = false; 
 
         }, 10); 
 
      } 
 
     health2 -= 10; 
 
 } 
 
  
  
 
 // Kick for Player 1 
 
 if(player1X + player1Width + 10 >= player2X  && 
 
     player1X <= player2X + player2Width && 
 
     player1Y + player1Height >= player2Y  &&   
 
     player1Y <= player2Y + player2Height && player1kick == true){ 
 
      if(player1kick = true)  { 
 
          setTimeout(() => { 
 
              player1kick = false; 
 
          }, 10); 
 
       } 
 
      health2 -= 20; 
 
 } 
 
  
  
 
 // Punch for Player 2 
 
 if(player2X + player2Width + 5 >= player1X  && 
 
     player2X <= player1X + player1Width && 
 
     player2Y + player2Height >= player1Y  &&   
 
     player2Y <= player1Y + player1Height && player2punch == true){ 
 
      if(player2punch = true)  { 
 
          setTimeout(() => { 
 
              player2punch = false; 
 
          }, 10); 
 
       } 
 
      health1 -= 10; 
 
 } 
 
   
 
 // Kick for Player 2 
 
 if(player2X + player2Width + 10 >= player1X  && 
 
      player2X <= player1X + player1Width && 
 
      player2Y + player2Height >= player1Y  &&   
 
      player2Y <= player1Y + player1Height && player2kick == true){ 
 
       if(player2kick = true)  { 
 
           setTimeout(() => { 
 
               player2kick = false; 
 
           }, 10); 
 
        } 
 
       health1 -= 20; 
 
   } 
 
    
 
  


    //do calculations (physics)
    player1AnimationIndexFloat += Player1AnimationFPS * deltatime; 
    
    player1AnimationIndex = Math.floor(player1AnimationIndexFloat) % player1Animation[player1AnimationState].length;
    
    let s = player1AnimationState;  // Animation Array
    let i = player1AnimationIndex;  // animation 
    let spriteCutStartX = player1Animation[s][i]%spriteSheetColumns1 * spriteWidth;
    let spriteCutStartY = Math.floor(player1Animation[s][i]/spriteSheetColumns1) * spriteHeight;

    //begin
    if (Player1Down == true) {
        player1AnimationState = 4;
    }
    else if (Player1Up == true) {
        player1AnimationState = 3;
    }
    else if (Player1Left == true) {
        player1AnimationState = 1;
    }
    else if (Player1Right == true) {
        player1AnimationState = 2;
    }
    else player1AnimationState = 0;
    

    



    // Ball tracking
// console.log("x= " + pos[0])
// console.log("y= " + pos[1])

// Health bars and stuff
if(health1 < 0) {
    health1 = 0;
}

if(health2 < 0) {
    health2 = 0;
}

// fillrect( x.pos, y. pos, width, height)

ctx. font = "20px fantasy"
ctx.fillText(health1, 10, 45);

ctx.fillText(health2, 510, 45);


ctx.fillRect(47, 28, 406, 20)
ctx.fillStyle = "rgb(255, 0, 0 )";

ctx.fillRect(50, 30, health1*4, 15)
ctx.fillStyle = "rgb(255, 255 , 0 )";
ctx.fillRect(547, 28, 406, 20)
ctx.fillStyle = "rgb(255, 0 , 0 )";

ctx.fillRect(550, 30, health2*4, 15)
ctx.fillStyle = "rgb(255, 255 , 0 )";

// If Health Reaches 0, the game restarts 

if(health1 < 0 && Restart == false) { 

    preOutput.innerHTML += " L + Ratio " 

    Restart = true; 

    health1=0 

} 

if(health2 < 0 && Restart == false ) { 

    preOutput.innerHTML += " L + Ratio " 

    Restart = true; 

    health2=0 

} 

 
 

// Restart Option 

if(Restart == true) { 

    player1X = 200; 

    player1Y = 200; 

    player2X = 500; 

    player2Y = 100; 

    health1 = 100; 

    health2 = 100; 

    d1x = 0; 

    d1y = 0; 

    d2x = 0; 

    d2y = 0; 

    Restart = false; 

} 

} 

// Run Gameloop
 let animation = setInterval( Gameloop, 1000/40);
 

// {} 
// [] 
// \
// ||

