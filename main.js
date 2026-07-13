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
        span.innerHTML = '<svg xmlns="http://w3.org" width="30" height="30" viewBox="0 0 12 12"><path fill="#ffffff" d="M2.22 2.22a.749.749 0 0 1 1.06 0L6 4.939L8.72 2.22a.749.749 0 1 1 1.06 1.06L7.061 6L9.78 8.72a.749.749 0 1 1-1.06 1.06L6 7.061L3.28 9.78a.749.749 0 1 1-1.06-1.06L4.939 6L2.22 3.28a.749.749 0 0 1 0-1.06Z"/></svg>';
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

//javascriptpro_
let allModBtn = document.querySelectorAll('.container .mode-btns-box button');
let focusBtn = document.querySelector('.container .mode-btns-box .focus-btn');
let shortBreakBtn = document.querySelector('.container .mode-btns-box .short-break-btn');
let longBreakBtn = document.querySelector('.container .mode-btns-box .long-break-btn');
let startBtn = document.querySelector('.container .btns .start-btn');
let pauseBtn = document.querySelector('.container .btns .pause-btn');
let resetBtn = document.querySelector('.container .btns .reset-btn');
let time = document.querySelector('.container .timer');

let setIn;
let count = 59;
let paused = true;
let minCount = 24;
let active = "focus";

time.innerHTML = `${minCount + 1}:00`;

let appendZero =(value)=>{
  value = value < 10 ? "0" + value : value;   
  return value;
}

resetBtn.addEventListener('click',(resetTime =()=>{
  pauseTimer();
  switch(active){
  case "long":
     minCount = 14;
     break;
  case "short":
     minCount = 4;
     break;
  default:
     minCount = 24;
     break;
  }
  count = 59;
  time.innerHTML = `${minCount + 1}:00`;
})
)

let removeBtnFocus =()=>{
 allModBtn.forEach((button)=>{
   button.classList.remove('btn-focus');
 })     
}

focusBtn.addEventListener('click',()=>{
  active = "focus";    
 removeBtnFocus();
 focusBtn.classList.add('btn-focus');
 pauseTimer();
 count = 59;
 minCount = 24;
 time.innerHTML = `${minCount + 1}:00`;
})

shortBreakBtn.addEventListener('click', () => {
  active = "short";  
  removeBtnFocus();
  shortBreakBtn.classList.add('btn-focus');
  pauseTimer();
  count = 59;
  minCount = 4;
  time.innerHTML = `${minCount + 1}:00`;
})

longBreakBtn.addEventListener('click', () => {
  active = "long";  
  removeBtnFocus();
  longBreakBtn.classList.add('btn-focus');
  pauseTimer();
  count = 59;
  minCount = 14;
  time.innerHTML = `${minCount + 1}:00`;
})

pauseBtn.addEventListener('click',(pauseTimer =()=>{
   paused = true;    
   clearInterval(setIn);
   resetBtn.style.display = 'none';
   pauseBtn.style.display = 'none';
   startBtn.style.display = 'block';
}) 
);

startBtn.addEventListener('click',()=>{
  resetBtn.style.display = 'block';
  pauseBtn.style.display = 'block';
  startBtn.style.display = 'none';  
  
  if(paused){
   paused = false;
   time.innerHTML = `${appendZero(minCount)}:${appendZero(count)}`;
   setIn = setInterval(()=>{
    count--;
    time.innerHTML = `${appendZero(minCount)}:${appendZero(count)}`;
    if(count == 0){
     if(minCount != 0){
        minCount--;    
        count = 60;
     }else{
        clearInterval(setIn)
     }   
    }
   },1000)
  }
})