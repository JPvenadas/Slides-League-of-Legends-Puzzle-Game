// these are the html elements that the javascript will be using
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
let goalIMG = document.querySelector('.goal-image')
let goalContainer = document.querySelector('.goal-container')
let puzzleBoard = document.querySelector('.puzzle-board')
let restart = document.querySelector('.restart')
let moves = document.getElementById('total-moves')
let difficulty = document.getElementById('game-level')
let Duration = document.getElementById('Time-left')
let cdownContainer = document.querySelector('.countdown-container')
let countdown = document.querySelector('.countdown')

//set up the animation of the Grid (this is a tool for animating your Grid elements, I use this because css transition dont work on grid)
const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(puzzleBoard, {stagger: 50});

//variables that will be used
let gameLevel;
let TotalMoves = 0
let time;
let timerActive;


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

menu.addEventListener('click', ()=>{
    menuContainer.style.display = "flex";
    clearInterval(timerActive)
    
})
resume.addEventListener('click', ()=>{
    menuContainer.style.display = "none"
    timerActive = activateTimer()
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
    setPosition(solvablearray(9))
    time = 120
   
   
})
normal.addEventListener('click', ()=>{
    gameLevel = "Normal"
    CreateTiles(16)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10" "P4 P5 P6 P11" "P7 P8 P9 P12" "P13 P14 P15 P16"'
    setPosition(solvablearray(16))
    time = 210
   
})
difficult.addEventListener('click', ()=>{
    gameLevel = "Difficult"
    CreateTiles(25)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10 P17" "P4 P5 P6 P11 P18" "P7 P8 P9 P12 P19" "P13 P14 P15 P16 P20" "P21 P22 P23 P24 P25"'
    setPosition(solvablearray(25))
    time = 285
   
})
modes.forEach(mode =>{
    mode.addEventListener('click', ()=>{
        startCountdown(3)
        
        let tiles = Array.from(puzzleBoard.querySelectorAll('button'))
        unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), tiles)
        setUpGame()
        let empty = document.querySelector('.empty-tile')
        tiles.map(clickabletiles=>{
            clickabletiles.addEventListener('click', ()=>{
              emptypos = trimGridArea(empty.style.getPropertyValue('grid-area'))
              currentpos = trimGridArea(clickabletiles.style.getPropertyValue('grid-area'));
              clickabletiles.style.setProperty("grid-area", emptypos)
              empty.style.setProperty('grid-area',currentpos)
              unlock(unlocklist,currentpos,tiles)
              forceGridAnimation();
              ChangeMoves("add")
            })
        })
    })
   
})
restart.addEventListener('click', ()=>{
    if(gameLevel == "Easy"){
        setPosition(solvablearray(9))
        time = 120
        
    }
    if(gameLevel == "Normal"){
        setPosition(solvablearray(16))
        time = 210
        
    }
    if(gameLevel == "Difficult"){
        setPosition(solvablearray(25))
        time = 285
    }
    clearInterval(timerActive)
    timerActive = activateTimer()
    let tiles = Array.from(puzzleBoard.querySelectorAll('button'))
    unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), tiles)
    forceGridAnimation()
    ChangeMoves("reset")
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
            tile.className = `button${num + 1}`
            tile.style.gridArea = `P${num+1}`
            tile.disabled = true
        }  
    }
}

let Randomizer = (num) =>{
    let array = []
    while(array.length < num){
        let randomNum = Math.floor((Math.random() * num)+ 1);
       if(array.includes(randomNum)){
       }
       else{
           array.push(randomNum);
       }
    }
    console.log(array)
   return array
}

let setPosition = (Randomnumbers) =>{
    for(let num=1; num < Randomnumbers.length; num++){
       document.querySelector(`.button${num}`).style.gridArea = `P${Randomnumbers[num-1]}`
    }
        document.querySelector('.empty-tile').style.gridArea = `P${Randomnumbers[Randomnumbers.length -1]}`
}
let unlocklist = {
    P1: ['P2', 'P4'],
    P2: ['P1', 'P3', 'P5'],
    P3: ['P2', 'P6', 'P10'],
    P4: ['P1', 'P5', 'P7'],
    P5: ['P2', 'P4', 'P6', 'P8'],
    P6: ['P3', 'P5', 'P9', 'P11'],
    P7: ['P4', 'P8', 'P13'],
    P8: ['P5', 'P7', 'P9', 'P14'],
    P9: ['P6', 'P8', 'P12', 'P15'],
    P10: ['P3', 'P11', 'P17'],
    P11: ['P6', 'P10', 'P12', 'P18'],
    P12: ['P11', 'P9', 'P16', 'P19'],
    P13: ['P7', 'P14', 'P21'],
    P14: ['P8', 'P13', 'P15', 'P22'],
    P15: ['P9', 'P14', 'P16', 'P23'],
    P16: ['P12', 'P15', 'P20', 'P24'],
    P17: ['P10', 'P18'],
    P18: ['P11', 'P17', 'P19'],
    P19: ['P12', 'P18', 'P20'],
    P20: ['P19', 'P16', 'P25'],
    P21: ['P13', 'P22'],
    P22: ['P14', 'P21', 'P23'],
    P23: ['P15', 'P22', 'P24'],
    P24: ['P16', 'P23', 'P25'],
    P25: ['P20', 'P24']
}
let unlock = (list, emptyposition, tiles) =>{
    let unlockable = list[emptyposition]
    tiles.forEach(tile =>{
        if(unlockable.includes(trimGridArea(tile.style.getPropertyValue('grid-area')))){
            tile.disabled = false
        }
        else{
            tile.disabled = true
        }
    })
}
 let solvablearray = (num) =>{
        let numstatus = num%2
        let inversionsStatus
        let random
        do{
            random = Randomizer(num)
            inversionsStatus = inversionchecker(random)
        }while(numstatus === inversionsStatus || numstatus == inversionsStatus)
        return random
 }
let trimGridArea = (GridPositionstring) =>{
    let regex = /[P][0-9]+/
    let result = GridPositionstring.match(regex)
    return result[0]
}

function inversionchecker(array){
    let inversions= 0;
    let NormalArrange = [1,2,3,10,4,5,6,11,7,8,9,12,13,14,15,16]
    let difficultArrange = [1,2,3,10,17,4,5,6,11,18,7,8,9,12,19,13,14,15,16,20,21,22,23,24,25]
    for(let num1 = 0; num1< (array.length-1); num1++){
       for(let num2 = (num1+1); num2 < (array.length-1); num2++){
           if(array.length == 9){
                if(array[num1]>array[num2]){
                    inversions++
                }
           } 
           if(array.length == 16){
                if(NormalArrange.indexOf(array[num1])>(NormalArrange.indexOf(array[num2]))){
                    inversions++
                }
           } 
           if(array.length == 25){
            if(difficultArrange.indexOf(array[num1])>(difficultArrange.indexOf(array[num2]))){
                inversions++
            }
           }
       }
    }
    return oddOrEven(inversions)
}
function oddOrEven(num){
    let remainder = num % 2 
    return remainder
}
function ChangeMoves(command){
   if(command == "add"){
    TotalMoves++
   
   }
   if(command == "reset"){
    TotalMoves = 0
   }
   moves.innerText = TotalMoves
}
function setUpGame(){
        playerName2.innerText = playerName.value
        goal.style.background = `url(Pictures/${gameLevel}-mode/Full-img.png) no-repeat center`
        goalIMG.src = `Pictures/${gameLevel}-mode/Full-img.png`
        options.style.top = "-400%";
        setTimeout(() => {
        welcome.style.top = "-400%"
        }, 500); 
        difficulty.innerText = gameLevel
        ChangeMoves("reset")
}

function startCountdown(count){
        countdown.innerText = "3"
        cdownContainer.style.display = "flex"
        let startCountdown =setInterval(() => {
            if(count < 0){
                cdownContainer.style.display = "none"
                clearInterval(startCountdown)
            }
            
            countdown.innerText = count
            count--
            countdown.classList.remove("enlarge")
            countdown.offsetWidth
            countdown.classList.add("enlarge")
        }, 1000);
        setTimeout(() => {
            timerActive = activateTimer()
        }, 4000);
}
let = activateTimer = () =>{
    function changeText_time(){
        let minutes = Math.floor(time/60)
        let seconds = time % 60
        seconds = seconds < 10? '0' + seconds: seconds;
        minutes = minutes < 10? '0' + minutes: minutes; 
        Duration.innerText = `${minutes}:${seconds}`
        time--
    }
    let timer =  setInterval(changeText_time, 1000)
    return timer
}

