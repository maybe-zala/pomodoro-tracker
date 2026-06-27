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
