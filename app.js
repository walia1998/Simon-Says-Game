let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "blue", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2")
document.addEventListener("keypress", ()=> {
    if(started == false) {
        started = true;


        levelUp();
    }
});
function gameFlash(btn) {
    btn.classList.add("flash");
        setInterval(function() {
            btn.classList.remove("flash")
        },250);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
        setInterval(function() {
            btn.classList.remove("userFlash")
        },250);
}

function levelUp() {
    userSeq = [];
    level++;

    h2.innerText = `Level ${level}`


    let randIdx = Math.floor(Math.random() * 4);
    let ranColor = btns[randIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);
    gameSeq.push(ranColor);
    gameFlash(ranBtn)
}
function checkAns(idx) {
//   let idx = level-1;
  
  if(userSeq[idx] === gameSeq[idx]) {
    if(userSeq.length == gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
  }else {
    h2.innerHTML =`Game over! your score was <b> ${level} </b> <br> Press any key to start the game` ;
    document.querySelector("body").style.backgroundColor = "red"
    setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white"
    },150)
    reset();
  }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");

    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress)
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq= [];
    level = 0
}