let start = document.querySelector('.start-button')
let welcome = document.querySelector('.welcome-screen-container');
let options = document.querySelector('.options-container')
let firstback = document.querySelector('.back1')
let secondback = document.querySelector('.back2')
let playerName = document.getElementById('name')
let playerName2 = document.querySelector('.player-name')
let btnSave = document.querySelector('.save-name')
let upperOptions = document.querySelector('.options-top')
let lowerOptions = document.querySelector('.options-bot')
let easy = document.querySelector('.easy')
let normal = document.querySelector('.normal')
let difficult = document.querySelector('.difficult')
let modes = document.querySelectorAll('.mode-container')
let menu = document.querySelector('.Menu')
let menuContainer = document.querySelector('.menu-container')
let resume = document.getElementById('resume')
let mainMenu = document.getElementById('menu')
let goal = document.querySelector('.btn-goal')
let goalContainer = document.querySelector('.goal-container')
let puzzleBoard = document.querySelector('.puzzle-board')

let gameLevel;

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
modes.forEach(mode =>{
    mode.addEventListener('click', ()=>{
        playerName2.innerText = playerName.value
        options.style.top = "-400%";
        setTimeout(() => {
        welcome.style.top = "-400%"
        }, 500);
    })
})
menu.addEventListener('click', ()=>{
    menuContainer.style.display = "flex";
})
resume.addEventListener('click', ()=>{
    menuContainer.style.display = "none"
})
mainMenu.addEventListener('click', ()=>{
    welcome.style.top = "0";
    menuContainer.style.display = "none"
})
goal.addEventListener('click', ()=>{
    goalContainer.style.top = "0"
})
goalContainer.addEventListener('click', ()=>{
    goalContainer.style.top = "-400%"
})
easy.addEventListener('click', ()=>{
    gameLevel = "Easy"
    CreateTiles(9);
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3" "P4 P5 P6" "P7 P8 P9"'
})
normal.addEventListener('click', ()=>{
    gameLevel = "Normal"
    CreateTiles(16)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10" "P4 P5 P6 P11" "P7 P8 P9 P12" "P13 P14 P15 P16"'
})
difficult.addEventListener('click', ()=>{
    gameLevel = "Difficult"
    CreateTiles(25)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10 P17" "P4 P5 P6 P11 P18" "P7 P8 P9 P12 P19" "P13 P14 P15 P16 P20" "P21 P22 P23 P24 P25"'
})
let CreateTiles = (tilenumber) =>{
    puzzleBoard.innerHTML = "";
    for(let num= 0; num < tilenumber; num++){
        let tile = document.createElement("button")
        puzzleBoard.appendChild(tile)
        tile.classList = `button`
    
        if(num == (tilenumber - 1)){
            tile.style.background = "transparent"
            tile.className = "empty-tile"
        }
        else{
            tile.style.background= `url(Pictures/${gameLevel}-mode/Parts/image_${num+1}.png) no-repeat center`
        }  
        
    }
}

