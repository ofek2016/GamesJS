const squares= document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft =document.querySelector("#time-left")
const score =document.querySelector("#score")

let result =0
let hitPostition
let currenTime = 60
let timerID = null;


function randomSquare(){
    squares.forEach(square =>{
        square.classList.remove('mole')
    })

    let randomsquare = squares[Math.floor(Math.random()*9)]
    randomsquare.classList.add('mole')

    hitPostition =randomsquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPostition ){
         result++;
         score.textContent=result
         hitPostition=null

        }
    })
})

function moveMole(){
 timerID = setInterval(randomSquare ,500)
}

moveMole()

function countDown(){
    currenTime--
    timeLeft.textContent = currenTime
    if(currenTime == 0){
        clearInterval(countDownTimerId)
        clearInterval(timerID)
        alert('game over final score is ' + result)
    }
}
let countDownTimerId = setInterval(countDown,500)


