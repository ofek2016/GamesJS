const cardarray =[
  {
    name:'fries',
    img:'images/fries.png',
  },
  {
    name:'cheeseburger',
    img:'images/cheeseburger.png',
  },
  {
    name:'hotdog',
    img:'images/hotdog.png',
  },
  {
    name:'ice-cream',
    img:'images/ice-cream.png',
  },
  {
    name:'pizza',
    img:'images/pizza.png',
  },
  {
    name:'milkshake',
    img:'images/milkshake.png',
  },
  {
    name:'fries',
    img:'images/fries.png',
  },
  {
    name:'cheeseburger',
    img:'images/cheeseburger.png',
  },
  {
    name:'hotdog',
    img:'images/hotdog.png',
  },
  {
    name:'ice-cream',
    img:'images/ice-cream.png',
  },
  {
    name:'pizza',
    img:'images/pizza.png',
  },
  {
    name:'milkshake',
    img:'images/milkshake.png',
  },

]



cardarray.sort(()=> 0.5 - Math.random())

// console.log(cardarray)

const grodDisplay=document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen=[]
let cardsChosenids=[]
const cardswon=[]

function createBoard(){
    for (let i = 0; i < cardarray.length; i++) {
     const card = document.createElement('img')
     card.setAttribute('src','images/blank.png')
     card.setAttribute('data-id',i)
     card.addEventListener('click',filpcard)
     grodDisplay.append(card)
    }
}

createBoard()

function chechMatch(){

    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenids[0]
    const optionTwoId = cardsChosenids[1]

    if(optionOneId==optionTwoId){
        alert('you have clicked the same image')
        cards[optionOneId].setAttribute('src','images/blank.png')
        cardsChosen=[]
        cardsChosenids=[]
        return 0
    }


    console.log('check for match')
    if(cardsChosen[0] == cardsChosen[1]){
        alert('you found a natch!')
        cards[optionOneId].setAttribute('src','images/white.png')
        cards[optionTwoId].setAttribute('src','images/white.png')
        cards[optionOneId].removeEventListener('click',filpcard)
        cards[optionTwoId].removeEventListener('click',filpcard)
        cardswon.push(cardsChosen)
    }else{
        cards[optionOneId].setAttribute('src','images/blank.png')
        cards[optionTwoId].setAttribute('src','images/blank.png')
        alert('sorry try again')
    }
    resultDisplay.textContent = cardswon.length
    cardsChosen=[]
    cardsChosenids=[]

    if(cardswon.length==cardarray.length/2){
       resultDisplay.innerHTML ="win"
    }
}

function filpcard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardarray[cardId].name)
    cardsChosenids.push(cardId)
    console.log(cardsChosenids)
    // console.log('clicked',cardId)
    console.log(cardsChosen)
    this.setAttribute('src',cardarray[cardId].img)
    if(cardsChosen.length === 2){
        setTimeout(chechMatch,500)
    }
    
}
