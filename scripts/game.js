import Player from './player.js'
import Ground from './ground.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 /1.5; //58
const PLAYER_HEIGHT = 94 /1.5; //62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2399;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;

//Game Objects
let player = null;
let ground = null;



let scaleRatio = null;
let previousTime = null;

function createSprites(){
    const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
    const playerheightInGame = PLAYER_HEIGHT * scaleRatio;
    const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
    const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

    player= new Player(ctx, playerWidthInGame, playerheightInGame, minJumpHeightInGame, maxJumpHeightInGame, scaleRatio);
}

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();
//Use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener('resize', ()=> setTimeout(setScreen, 500));

if(screen.orientation) {
    screen.orientation.addEventListener('change', setScreen);
}

function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight, 
        document.documentElement.clientHeight
        );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );

// window is wider than game width
    if(screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT)
    {
    return screenWidth / GAME_WIDTH
    } else 
    {
        return screenHeight / GAME_HEIGHT
    }
}

function clearSceen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
    if(previousTime === null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime
    console/console.log(frameTimeDelta);
    clearSceen();

//Update Game Objects



//Draw Game Objects
player.draw();


    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);