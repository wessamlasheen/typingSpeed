let startDiv = document.querySelector(".start");
let allWords = document.querySelector(".word-writing");
let wordPlace = document.querySelector(".wType");
let arrOfWords = ["code", "css", "html"];
let finshDiv = document.querySelector(".finish");
let myTime = document.querySelector(".data .time");
let myScore = document.querySelector(".data .score");
let lvlSpanNu = document.querySelector(".level-nu");
let lvlSpanTime = document.querySelector(".time-lvl");
let selectBox = document.querySelector(".levels");
let timeLeft = document.querySelector(".timeLeft");
let userFieldInput = document.querySelector(".userWord");
let beginScore = document.querySelector(".score");
let finalScore = document.querySelector(".final");
beginScore.innerHTML = 0;
finalScore.innerHTML = arrOfWords.length;
let randomWord = "";
let lvls = {
  easy: 6,
  medium: 4,
  hard: 2,
  veryHard: 1,
};

// function create all level options in select box
function createOptions() {
  let lvl = Object.keys(lvls);
  console.log(lvl);
  for (let i = 0; i < lvl.length; i++) {
    let levelOption = document.createElement("option");
    levelOption.innerHTML = lvl[i];
    selectBox.appendChild(levelOption);
  }
}
createOptions();

// function done on change level in select box

selectBox.onchange = function () {
  lvlSpanNu.innerHTML = `[${this.value}]`;
  lvlSpanTime.innerHTML = lvls[this.value];
  timeLeft.innerHTML = lvls[this.value];
};
// cancle paste in input
userFieldInput.onpaste = function () {
  return false;
};

startDiv.onclick = function () {
  startDiv.remove();
  userFieldInput.focus();
  dispalyArrEle();
};
//dispaly all array elements in word-writing div
function dispalyArrEle() {
  randomWord = arrOfWords[Math.floor(Math.random() * arrOfWords.length)];
  wordPlace.innerHTML = randomWord;

  arrOfWords.splice(arrOfWords.indexOf(randomWord), 1);
  allWords.innerHTML = "";
  for (let i = 0; i < arrOfWords.length; i++) {
    allWords.innerHTML += `<span>${arrOfWords[i]}</span>`;
  }
  calcTimeLeft();
}

// function calc time left

function calcTimeLeft() {
  timeLeft.innerHTML = lvls[selectBox.value];
  let handler = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(handler);
      if (
        userFieldInput.value.toLowerCase() == randomWord.toLocaleLowerCase()
      ) {
        userFieldInput.value = "";
        beginScore.innerHTML++;
        if (arrOfWords.length > 0) {
          dispalyArrEle();
        } else {
          finshDiv.innerHTML = "congrats";
          finshDiv.classList.add("good");
        }
      } else {
        console.log("not equal");
        finshDiv.innerHTML = "game over";
        finshDiv.classList.add("bad");
      }
    }
  }, 1000);
}
