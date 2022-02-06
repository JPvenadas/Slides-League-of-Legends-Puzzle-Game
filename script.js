let play = document.querySelector('.play-button');
let difficultyPage = document.querySelector('.difficulty-page');
let welcomePage = document.querySelector('.welcome-page');
let back = document.querySelectorAll('.back');
let instructionpage = document.querySelector('.instruction-page');
let instruction = document.querySelector('.instructions-button');
let Easymode = document.querySelector('.easy')



play.addEventListener('click', ()=>{
    difficultyPage.style.top = '0';
})
back.forEach(button =>{
    button.addEventListener('click', ()=>{
        difficultyPage.style.top = "-200%";
        instructionpage.style.top = "-200%";
    })
});
instruction.addEventListener('click', ()=>{
    instructionpage.style.top = '0';
})

Easymode.addEventListener('click', ()=>{
    difficultyPage.style.top = "-200%";
    setTimeout(()=>{
        welcomePage.style.top = "-200%";
    },500)
})