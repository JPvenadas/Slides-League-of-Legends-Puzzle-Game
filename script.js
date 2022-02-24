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
let mainMenu = document.querySelectorAll('.menu')
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
let resultContainer = document.querySelector('.result-container')
let resultstring = document.querySelector('.Result')
let Resultpic = document.querySelector('.user-pic')
let playagain = document.querySelector('.replay')
let next = document.querySelector('.Nextlevel')
let instructionbutton = document.querySelector('.instructions-button')
let instructionCon = document.querySelector('.instruction-container')
let leftinstruction = document.querySelector('.left-button')
let rightinstruction = document.querySelector('.right-button')
let instructiontop = document.querySelector('.instructions-top')
let instructionbot = document.querySelector('.instructions-bot')
let instructionback = document.querySelector('.instruction-back')

//set up the animation of the Grid (this is a tool for animating your Grid elements, I use this because css transition dont work on grid)
const { unwrapGrid, forceGridAnimation } = animateCSSGrid.wrapGrid(puzzleBoard, {stagger: 50});

//variables that will be used
let gameLevel;
let TotalMoves = 0
let time;
let timerActive;
let timer
let chosenPic
let instructionPos = 0
let easyArrange = [1,2,3,4,5,6,7,8,9]
let NormalArrange = [1,2,3,10,4,5,6,11,7,8,9,12,13,14,15,16]
let difficultArrange = [1,2,3,10,17,4,5,6,11,18,7,8,9,12,19,13,14,15,16,20,21,22,23,24,25]

start.addEventListener('click', ()=>{
    options.style.top = "0"
})
firstback.addEventListener('click', ()=>{
    options.style.top = "-200%"
})
playerName.addEventListener('keydown', ()=>{
   if(playerName.value !== "" || playerName.value !== " "){
    btnSave.innerHTML = "Done"
   }
})
btnSave.addEventListener('click', ()=>{
    upperOptions.style.transform = "translateX(-100%)"
    lowerOptions.style.transform = "translateX(0)"
})
playerName.addEventListener('keydown', ()=>{
    playerName.classList.remove("pop")
    playerName.offsetWidth
    playerName.classList.add('pop')
})
instructionbutton.addEventListener('click', ()=>{
    instructiontop.style.transform = "translateX(0)"
    instructionbot.style.transform = "translateX(-400%)"
    leftinstruction.style.display = "none"
    rightinstruction.style.display = "block"
    instructionPos = 0
    instructionCon.style.top = "0"
})
rightinstruction.addEventListener('click', ()=>{
   moveInstruction("Right")
})
leftinstruction.addEventListener('click', ()=>{
    moveInstruction("Left")
})
let moveInstruction = (direction)=>{
    direction == "Left"? instructionPos--: instructionPos++;
    instructionPos == 0? leftinstruction.style.display= "none": leftinstruction.style.display= "block"
    instructionPos == 4? rightinstruction.style.display= "none": rightinstruction.style.display= "block";
    instructionbot.style.transform =`translateX(-${400 -(instructionPos * 100)}%)`
    instructiontop.style.transform =`translateX(-${100 * instructionPos}%)`
}
instructionback.addEventListener('click', ()=>{
    instructionCon.style.top= "-300%"
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
Array.from(mainMenu).map(individualmenu=>{
    individualmenu.addEventListener('click', ()=>{
        welcome.style.top = "0";
        menuContainer.style.display = "none"
        resultContainer.style.display = "none"
    })
})
goal.addEventListener('click', ()=>{
    goalContainer.style.top = "0"
   goalContainer.style.zIndex = "10"
})
goalContainer.addEventListener('click', ()=>{
    goalContainer.style.top = "-400%"
})
easy.addEventListener('click', ()=>{
    GameFormat("Easy")
})
normal.addEventListener('click', ()=>{
    GameFormat("Normal")
})
difficult.addEventListener('click', ()=>{
    GameFormat("Difficult")
})
modes.forEach(mode =>{
    mode.addEventListener('click', ()=>{
       setupGame()
    })
   
})
restart.addEventListener('click', ()=>{
    if(gameLevel == "Easy"){
        setPosition(solvablearray(9))
        time = 180
        
    }
    if(gameLevel == "Normal"){
        setPosition(solvablearray16())
        time = 300
        
    }
    if(gameLevel == "Difficult"){
        setPosition(solvablearray(25))
        time = 420
    }
   
    
    unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), buttons)
    forceGridAnimation()
    ChangeMoves("reset")
})
let GameFormat = (level) =>{
   if(level === "Easy"){
     gameLevel = "Easy"
     CreateTiles(9)
     puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3" "P4 P5 P6" "P7 P8 P9"'
     setPosition(solvablearray(9))
     time = 180
   }
   else if(level === "Normal"){
    gameLevel = "Normal"
    CreateTiles(16)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10" "P4 P5 P6 P11" "P7 P8 P9 P12" "P13 P14 P15 P16"'
    setPosition(solvablearray16())
    time = 300
   }
   else if(level === "Difficult"){
    gameLevel = "Difficult"
    CreateTiles(25)
    puzzleBoard.style.gridTemplateAreas = '"P1 P2 P3 P10 P17" "P4 P5 P6 P11 P18" "P7 P8 P9 P12 P19" "P13 P14 P15 P16 P20" "P21 P22 P23 P24 P25"'
    setPosition(solvablearray(25))
    time = 420
    next.style.display = "none"
   }
   let minutes = time / 60
   let seconds = time % 60
   minutes <10?minutes = "0"+ minutes: minutes
   seconds <10 ? seconds = "0" + seconds: seconds 
   Duration.innerText = `${minutes}:${seconds}`
}
let CreateTiles = (tilenumber) =>{
    let easyPos = [[0,0],[50,0],[100,0],
                   [0,50],[50,50],[100,50],
                   [0,100],[50,100]]
    let normalPos =  [[0.0],[33.3,0],[66.6,0],[100,0],
                   [0,33.3],[33.3,33.3],[66.6,33.3],[100,33.3],
                   [0,66.0],[33.3,66.6],[66.6,66.6],[100,-66.6],
                   [0,100],[33.3,100],[66.6,100]]
    let hardPos = [[0,0],[25,0],[50,0],[75,0],[100,0],
                   [0,25],[25,25],[50,25],[75,25],[100,25],
                   [0,50],[25,50],[50,50],[75,50],[100,50],
                   [0,75],[25,75],[50,75],[75,75],[100,75],
                   [0,100],[25,100],[50,100],[75,100]]
    puzzleBoard.innerHTML = "";
    chosenPic = `Pictures/Puzzle_Pics/${Math.floor(Math.random() * 26) + 1}.jpg`
    for(let num= 0; num < tilenumber; num++){
        let tile = document.createElement("button")
        puzzleBoard.appendChild(tile)
        tile.classList = `button`
    
        if(num == (tilenumber - 1)){
            tile.style.background = "transparent"
            tile.className = "empty-tile" 
        }
        else{ 
            tile.style.background =  `url(${chosenPic})`
            tile.className = `button${num + 1}`
            gameLevel == "Easy"?  tile.style.backgroundPosition = `${easyPos[num][0]}% ${easyPos[num][1]}%`:
            gameLevel == "Normal"? tile.style.backgroundPosition = `${normalPos[num][0]}% ${normalPos[num][1]}%`:
            gameLevel == "Difficult"? tile.style.backgroundPosition = `${hardPos[num][0]}% ${hardPos[num][1]}%`:
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
        }while(numstatus == inversionsStatus)
        return random
 }
 let solvablearray16 = () =>{
       let inversionsStatus
       let emptyPlace
       let random
       let evenpos = [1,2,3,10,7,8,9,12]
       do{
            random = Randomizer(16)
            evenpos.includes(random[15])? emptyPlace = "even": emptyPlace = "odd"
            inversionsStatus = inversionchecker(random)
       }while((emptyPlace == "even" && inversionsStatus == 0) || (emptyPlace =="odd" && inversionsStatus == 1))
       return random
 }
let trimGridArea = (GridPositionstring) =>{
    let regex = /[P][0-9]+/
    let result = GridPositionstring.match(regex)
    return result[0]
}

function inversionchecker(array){
    let inversions= 0;
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
function setupGame(){
    startCountdown(3)
    buttons = Array.from(puzzleBoard.querySelectorAll('button'))
    unlock(unlocklist, trimGridArea(document.querySelector('.empty-tile').style.gridArea), buttons)
    setupField()
    let empty = document.querySelector('.empty-tile')
    buttons.map(clickabletiles=>{
        clickabletiles.addEventListener('click', ()=>{
          emptypos = trimGridArea(empty.style.getPropertyValue('grid-area'))
          currentpos = trimGridArea(clickabletiles.style.getPropertyValue('grid-area'));
          clickabletiles.style.setProperty("grid-area", emptypos)
          empty.style.setProperty('grid-area',currentpos)
          unlock(unlocklist,currentpos,buttons)
          forceGridAnimation();
          ChangeMoves("add")
          checkSuccess()
        })
    })
    upperOptions.style.transform = "translateX(0)"
    lowerOptions.style.transform = "translateX(-100%)"
}
function setupField(){
        playerName2.innerText = playerName.value
        goal.style.background = `url(${chosenPic})`
        goalIMG.src = chosenPic
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
        if(time < 0){
           clearInterval(timer)
           clearInterval(timerActive)
          resultContainer.style.display = "flex"
          resultContainer.style.animation = "spawn 1s"
           buttons.forEach(button=>{
            button.Disbled = true
            resultstring.innerText = "Failed!"
            Resultpic.style.background = "url(Pictures/user-sad.png)"
         })
        }
    }
    timer =  setInterval(changeText_time, 1000)
    return timer
}

let checkSuccess = ()=>{
    let CorrectPosNo = 0;
    let CorrectPos;
    gameLevel == "Easy"? CorrectPos = easyArrange:
    gameLevel == "Normal"? CorrectPos = NormalArrange: CorrectPos = difficultArrange 
    for(let num = 0; num < buttons.length; num++){
        if(trimGridArea(buttons[num].style.getPropertyValue('grid-area')) == `P${CorrectPos[num]}`){
            CorrectPosNo++
        }
    }
    if(CorrectPosNo == buttons.length){
        let lastTile =  buttons[buttons.length - 1]
        clearInterval(timer)
        clearInterval(timerActive)
        lastTile.style.background = buttons[1].style.background
         lastTile.style.backgroundPosition = "100% 100%"
         lastTile.style.animation =  "spawn 2s"
         lastTile.style.display = "none"
         lastTile.style.display = "block"
         resultContainer.style.display = "flex"
         resultstring.innerText = "Success!"
            Resultpic.style.background = "url(Pictures/user-icon.png)"
         buttons.forEach(button=>{
            button.Disbled = true
         })
    }
}
playagain.addEventListener('click', ()=>{
    puzzleBoard.html = ""
    gameLevel == "Easy"? GameFormat("Easy"):
    gameLevel == "Normal"? GameFormat("Normal"):
    GameFormat("Difficult")
    resultContainer.style.display = "none"
    setupGame()
})
next.addEventListener('click', ()=>{
    resultContainer.style.display = 'none'
    puzzleBoard.html = ""
    gameLevel == "Easy"? GameFormat("Normal"):
    gameLevel == "Normal"? GameFormat("Difficult"):
    setupField()
    setupGame()
})
