const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask(){
    if(inputBox.value === ''){
        alert("your task cannot be blank!");
    }
    else if(listContainer.children.length >= 9){
        alert("you can only add a maximum of 9 tasks!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.classList.add("list-item"); 
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '<svg x mlns="http://w3.org" width="30" height="30" viewBox="0 0 12 12"><path fill="#ffffff" d="M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939L8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6L9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061L3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6L2.22 3.28a.749.749 0 0 1 0-1.06Z"/></svg>';
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.closest("span")){         
        e.target.closest("span").parentElement.remove();         
        saveData();     
    } 
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();

// pomodoro timer down

const timer_type_60 = "60";
const timer_type_30 = "30";
const timer_type_5 = "5";
const sixtyMinsInSeconds =  3600;
const thirtyMinsInSeconds =  1800;
const fiveMinsInSeconds =  300;

let pomodoroType = timer_type_60;
let timerValue = thirtyMinsInSeconds; 
let allTypes = document.querySelectorAll(".pomodoro .buttons");
let timer = document.querySelector(".countdown")
let startButton = document.querySelector(".pomodoro .start")
let stopButton = document.querySelector(".pomodoro .stop")
let restartButton = document.querySelector(".pomodoro .restart")
let progressInterval;

let resetTimer = () => {
  clearInterval(progressInterval);
  startButton.style.display = "block";
  stopButton.style.display = "none";
  if(pomodoroType === "60"){
    timerValue = sixtyMinsInSeconds;
  } else if(pomodoroType === "30"){
    timerValue = thirtyMinsInSeconds;
  } else{
    timerValue = fiveMinsInSeconds
  }
  timerProgress();
  
};

let formatedNumberInMinutes = (number) => {
    let minutes = Math.trunc(number / 60).toString().padStart(2, '0');
    let seconds = Math.trunc(number % 60).toString().padStart(2, '0');

    return`${minutes}:${seconds}`;
}

let timerProgress =()=> {
    timer.innerHTML = `${formatedNumberInMinutes(timerValue)}`;
}

let getType = (elem, type) => {
  for (let x of allTypes) {
    x.classList.remove("active");
  }
  elem.classList.add("active");
  pomodoroType = type;
  resetTimer();
}

let startTimer = () => {
    progressInterval = setInterval(() => {
        timerValue--;
        timerProgress();
    },1000);
    startButton.style.display = "none";
    stopButton.style.display = "block";
}

let stopTimer = () => {
    clearInterval(progressInterval);
    startButton.style.display = "block";
    stopButton.style.display = "none";
}

restartButton.addEventListener("click", resetTimer);
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);