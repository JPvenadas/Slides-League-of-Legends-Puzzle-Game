let start = document.querySelector('.start-button')
let options = document.querySelector('.options-container')
let firstback = document.querySelector('.back1')
let secondback = document.querySelector('.back2')
let playerName = document.getElementById('name')
let btnSave = document.querySelector('.save-name')
let upperOptions = document.querySelector('.options-top')
let lowerOptions = document.querySelector('.options-bot')
let radio = document.querySelectorAll('input[type=radio]')
let modeContainer = document.querySelectorAll('.mode-container');

start.addEventListener('click', ()=>{
    options.style.top = "0"
})
firstback.addEventListener('click', ()=>{
    options.style.top = "-400%"
})
playerName.addEventListener('keydown', ()=>{
   if(playerName.value !== "" || playerName.value !== " "){
    btnSave.innerHTML = "Done"
   }
})
btnSave.addEventListener('click', ()=>{
    upperOptions.style.transform = "translateX(-100%)";
    lowerOptions.style.transform = "translateX(0)";
})
secondback.addEventListener('click', ()=>{
    upperOptions.style.transform = "translateX(0)";
    lowerOptions.style.transform = "translateX(-100%)";
})