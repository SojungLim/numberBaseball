const StartPage = document.querySelector("#start-page")
const startBtn = StartPage.querySelector("#start-btn");
const numberForm = document.querySelector("#number-form");
const numberInput = numberForm.querySelector("input");
const resultPage = document.querySelector("#result-page");
const strikeDiv = resultPage.querySelector("#strikeDiv");
const ballDiv = resultPage.querySelector("#ballDiv");
const tryAgainBtn = resultPage.querySelector("#tryagain-btn");

const HIDDEN_CLASSNAME = "hidden";

let strikes = [0];
let balls = [0];
let numbersFromUser = [];
let randomNumber = [];
const numbers = ['0','1','2','3','4','5','6','7','8','9']

function goToStart(event) {
    resultPage.classList.add(HIDDEN_CLASSNAME);
    StartPage.classList.remove(HIDDEN_CLASSNAME);
    strikeDiv.classList.remove(HIDDEN_CLASSNAME);
    ballDiv.classList.remove(HIDDEN_CLASSNAME);
    strikes = [0];
    balls = [0];
    numbersFromUser = [];
    randomNumber = [];
    event.preventDefault();
}

tryAgainBtn.addEventListener("click",goToStart)

function paintScore() {
    const plusStrikes = strikes.reduce( (acc, cur) => acc + cur,0 );
    const plusBalls = balls.reduce( (acc, cur) => acc + cur,0 );

    if(strikes!==[0]) {  
        strikeDiv.innerHTML = `${plusStrikes} STRIKE!`;    
    }
    
    if(balls!==[0]) {
        ballDiv.innerHTML = `${plusBalls} BALL`;
    }
    if(strikes.length===1 && balls.length===1) {
        strikeDiv.classList.add(HIDDEN_CLASSNAME);
        ballDiv.innerHTML = `YOU LOSE`;
    }
    if(strikes.length===4) {
        strikeDiv.innerHTML = `3 STRIKE! YOU WIN!!`;
        ballDiv.classList.add(HIDDEN_CLASSNAME);

    }
}

function calculateScore() {     
    if(randomNumber[0]===numbersFromUser[0]) {
        strikes.push(1);
    } else if(randomNumber[0]===numbersFromUser[1]) {
        balls.push(1);
    } else if(randomNumber[0]===numbersFromUser[2]) {
        balls.push(1);
    }
    if(randomNumber[1]===numbersFromUser[0]) {
        balls.push(1);
    } else if(randomNumber[1]===numbersFromUser[1]) {
        strikes.push(1);
    } else if(randomNumber[1]===numbersFromUser[2]) {
        balls.push(1);
    }
    if(randomNumber[2]===numbersFromUser[0]) {
        balls.push(1);
    } else if(randomNumber[2]===numbersFromUser[1]) {
        balls.push(1);
    } else if(randomNumber[2]===numbersFromUser[2]) {
        strikes.push(1);
    }
}

function playgame(event) {
    event.preventDefault();
    numbersFromUser = Array.from(numberInput.value);
    numberInput.value = '';
    numberForm.classList.add(HIDDEN_CLASSNAME);
    resultPage.classList.remove(HIDDEN_CLASSNAME);
    calculateScore();
    paintScore()
}

numberForm.addEventListener("submit",playgame);

let count = 10;
function counting(){
    count-=1;
    const span = document.querySelector("#start-page h3 span");
    span.innerHTML = `${count} times`;
    if(count===0){
        startBtn.setAttribute("disabled","disabled");
    }
}

function PressStartBtn(event) {
    StartPage.classList.add(HIDDEN_CLASSNAME);
    numberForm.classList.remove(HIDDEN_CLASSNAME);
    
    while(randomNumber.length<3) {
        const gernerateNumbers = numbers[Math.floor(Math.random() * numbers.length)]
        randomNumber.push(gernerateNumbers);
        if(randomNumber[0]==randomNumber[1]) {                          //중복된 숫자 안생기도록 만든 if문
            randomNumber.pop()
        } else if (randomNumber[0]==randomNumber[2]){
            randomNumber.pop();
        } else if (randomNumber[1]==randomNumber[2] && randomNumber[1]!==undefined){
            randomNumber.pop();
        }
    }
}

startBtn.addEventListener("click",PressStartBtn);



