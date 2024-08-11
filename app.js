let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

// Sound effects
let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
    endSound.play();
}

let btnsSound = document.querySelector(".btnSound")
let btnSound = function () {
    btnsSound.play();
}

let sbtnSound = document.querySelector(".sbtnSound")
let startbtnSound = function () {
    sbtnSound.play();
}

// Start/End game
let startbtn = document.querySelector(".start"); 
startbtn.addEventListener("click", function() {        
    if (!started) {
        console.log("Game is started");
        started = true;   
        startbtn.innerText = "End"; 
        startbtn.style.backgroundColor = "red";
        document.querySelector("body").style.backgroundColor = "rgb(224, 220, 255)"; // Reset background when starting
        levelUp();
        startbtnSound();
    } else {
        console.log("Game is ended");
        reset();
    }
});

// Flash buttons & level up
function gameFlash(btn) {
    if (!started) return; // Prevent flashing if the game is not started
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    if (!started) return; // Prevent user flash if the game is not started
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
    btnSound();
}

function levelUp() {
    if (!started) return; // Stop if the game is not started
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);
    gameFlash(randBtn);
}

let currlevel = 0;
function checkAns(idx) {
    if (!started) return; // Stop if the game is not started
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => levelUp(), 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start Button To Start`;
        document.querySelector("body").style.backgroundColor = "red";
        startbtn.style.backgroundColor = "#5dbea3";   
        gameOverSound();

        // Flashing background colors
        setTimeout(() => { 
            document.querySelector("body").style.backgroundColor = "black"; 
            console.log("Background color changed to black");
        }, 100);
        setTimeout(() => { 
            document.querySelector("body").style.backgroundColor = "red"; 
            console.log("Background color changed to red");
        }, 200);
        setTimeout(() => { 
            document.querySelector("body").style.backgroundColor = "black"; 
            console.log("Background color changed to black");
        }, 300);
        setTimeout(() => { 
            document.querySelector("body").style.backgroundColor = "red"; 
            console.log("Background color changed to red");
        }, 400);
        setTimeout(() => { 
            document.querySelector("body").style.backgroundColor = "black"; 
            console.log("Background color changed to black");
        }, 500);

        let highScore = document.querySelector('h1.highscore');
        if (currlevel >= level) {
            highScore.innerText = `Your High Score is ${currlevel}.`;
        } else {
            highScore.innerText = `Your High Score is ${level}.`;
            currlevel = level;            
        }

        // Call reset with a delay to allow visual feedback
        setTimeout(() => {
            reset();
            console.log("Game reset and background color reset to initial");
        }, 600);
    }
}

// Button event listeners
function btnPress() {
    if (!started) return; // Stop if the game is not started
    let btn = this;
    userFlash(btn);
    let userColor = this.getAttribute("id");
    console.log("Button pressed:", userColor);
    userSeq.push(userColor);
    console.log("User sequence:", userSeq);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    console.log("Resetting the game...");
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    startbtn.innerText = "Start";
    startbtn.style.backgroundColor = "#5dbea3";
    h2.innerText = "Press Start Button To Play";
    document.querySelector("body").style.backgroundColor = "rgb(224, 220, 255)"; // Reset the background color

    // Optionally, you can disable button interactions here
    for (const btn of allBtns) {
        btn.removeEventListener("click", btnPress);
    }
    // Re-enable the button listeners
    for (const btn of allBtns) {
        btn.addEventListener("click", btnPress);
    }
}
