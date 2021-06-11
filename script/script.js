"use strict";
let playerOne = [0, 0, 0, 0, 0];
let playerTwo = [0, 0, 0, 0, 0];
let players = [playerOne, playerTwo];
let currentRound = 0;
let playWithComputer = false;
const colorNewRound = '#d99d3d';

// pictures in variables
const diceNull = 'dice-null.png';
const diceOne = 'dice-one.png'
const diceTwo = 'dice-two.png'
const diceThree = 'dice-three.png'
const diceFour = 'dice-four.png'
const diceFive = 'dice-five.png'
const diceSix = 'dice-six.png'
const allDices = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];

//which dice want players change?
let changeTheRollPlayerOne = [0, 0, 0, 0, 0];
let changeTheRollPlayerTwo = [0, 0, 0, 0, 0];
let kindOfRolling = {
  "Poker": 7,
  "Four of a kind": 6,
  "Full house": 5,
  "Straight": 4,
  "Three of a kind": 3,
  "Two pair": 2,
  "One pair": 1,
  "High card": 0
}

//declare a variables from html
let dices = document.querySelectorAll(".dice");
const buttonRoll = document.querySelector(".buttonRoll>input");
const headPlayerTwoFirst = document.querySelector(".scoreBoardTwo>h2");
const headPlayerTwoSecond = document.querySelector(".nameOfPlayerTwo>h2");
const checkBox = document.querySelector("input[type=checkbox]");
const countWinsPlayerOne = document.querySelector('.countWinsPlayerOne');
const countWinsPlayerTwo = document.querySelector('.countWinsPlayerTwo');
const resultOfPlayerOne = document.querySelector('.resultOfPlayerOne>h2');
const resultOfPlayerTwo = document.querySelector('resultOfPlayerTwo>h2');
const firstRoundPOne = document.querySelector('.firstRoundPOne>h3');
const firstRoundPTwo = document.querySelector('.firstRoundPTwo>h3');
const secondRoundPOne = document.querySelector('.secondRoundPOne>h3');
const secondRoundPTwo = document.querySelector('.secondRoundPTwo>h3');



//Function show correct pictures of Dice on browser
//dodać animację jak losują się kości
function changePictureOfDice() {
  let i = 0;
  for (const dice of dices) {
    let number = players[Math.floor(i / 5)][i % 5];
    switch (number) {
      case 0:
        dice.setAttribute("src", `img/${diceNull}`);
        break;
      case 1:
        dice.setAttribute("src", `img/${diceOne}`);
        break;
      case 2:
        dice.setAttribute("src", `img/${diceTwo}`);
        break;
      case 3:
        dice.setAttribute("src", `img/${diceThree}`);
        break;
      case 4:
        dice.setAttribute("src", `img/${diceFour}`);
        break;
      case 5:
        dice.setAttribute("src", `img/${diceFive}`);
        break;
      case 6:
        dice.setAttribute("src", `img/${diceSix}`);
        break;
    }
    i++;
  }
}
//Function which draw lots dices
function firstTurn(player){
    let i=0
    while (i<5){
        player[i]=Math.ceil(Math.random()*6);
        i++
    }
    return player;
}




function checkTheResult(handOfDice){
    let result={1:0,2:0,3:0,4:0,5:0,6:0};
    let arrangementOfCards
    let powerOfCards
    let keepLooking=true;
    let resultOfCards
    for (let i=0;i<5;i++){
        result[handOfDice[i]]+=1;
    }
    //check the poker hand
    for (let i=1;i<=6;i++){
        if (result[i]==5 && keepLooking){
            arrangementOfCards=kindOfRolling["Poker"];
            powerOfCards=i;
            let resultOfCards=[arrangementOfCards,powerOfCards];
            return resultOfCards;
            keepLooking=false;
            break;
        }
    }
    //check the four of the kind
    for (let i=1;i<=6;i++){
        if (result[i]==4 && keepLooking){
            arrangementOfCards=kindOfRolling["Four of a kind"];
            powerOfCards=i;
            let resultOfCards=[arrangementOfCards,powerOfCards];
            return resultOfCards;
            keepLooking=false;
            break;
        }
    }
    //check full house
    for (let i=1;i<=6;i++){
        if (result[i]==3 && keepLooking){
            for (let j=1;j<=6;j++){
                if (result[j]==2 && keepLooking){
                    arrangementOfCards=kindOfRolling["Full house"];
                    powerOfCards=i;
                    let resultOfCards=[arrangementOfCards,powerOfCards];
                    return resultOfCards;
                    keepLooking=false;
                    break;
                }
            }
        break;
        }
    }
    //check straight
    if (result[1]==1 && result[2]==1 && result[3]==1 && result[4]==1 && result[5]==1 && keepLooking){
        arrangementOfCards=kindOfRolling["Straight"];
        let resultOfCards=[arrangementOfCards,5];
        return resultOfCards;
        keepLooking=false;
    }
    else if (result[2]==1 && result[3]==1 && result[4]==1 && result[5]==1 && result[6]==1 &&keepLooking){
        arrangementOfCards=kindOfRolling["Straight"];
        let resultOfCards=[arrangementOfCards,6];
        return resultOfCards;
        keepLooking=false;
    }
    //check three of a kind
    for (let i=1;i<=6;i++){
        if (result[i]==3 && keepLooking){
            arrangementOfCards=kindOfRolling["Three of a kind"];
            powerOfCards=i;
            let resultOfCards=[arrangementOfCards,powerOfCards];
            return resultOfCards;
            keepLooking=false;
            break;
        }
    }
    //check two pair
    for (let i=1;i<=6 && keepLooking;i++){
        if (result[i]==2){
            for (let j=1;j<=6;j++){
                if (result[j]==2 &&i!=j){
                    arrangementOfCards=kindOfRolling["Two pair"];
                    powerOfCards=Math.max(i,j);
                    let resultOfCards=[arrangementOfCards,powerOfCards];
                    return resultOfCards;
                    keepLooking=false;
                    break;
                }
            }
        break;
        }
    }
    //check one pair
    for (let i=1;i<=6;i++){
        if (result[i]==2 && keepLooking){
            arrangementOfCards=kindOfRolling["One pair"];
            powerOfCards=i;
            let resultOfCards=[arrangementOfCards,powerOfCards];
            return resultOfCards;
            keepLooking=false;
            break;
        }
    }
    //check high card
    for (let i=6;i>=1;i--){
        if (result[i]==1 && keepLooking){
            arrangementOfCards=kindOfRolling["High card"];
            powerOfCards=i;
            let resultOfCards=[arrangementOfCards,powerOfCards];
            return resultOfCards;
            keepLooking=false;
            break;
        }
    }
}

//Event Listeners
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    playWithComputer = false;
    headPlayerTwoFirst.innerHTML = "Player 2";
    headPlayerTwoSecond.innerHTML = "Player 2";
  } else {
    playWithComputer = true;
    headPlayerTwoFirst.innerHTML = "Computer";
    headPlayerTwoSecond.innerHTML = "Computer";
  }
});

buttonRoll.addEventListener("click", () => {
  currentRound++;
  switch (currentRound) {
    case 1:
      firstRoundPOne.style.color = `${colorNewRound}`;
      firstTurn(playerOne);
      changePictureOfDice();







      break;
    case 2:
      firstRoundPTwo.style.color = `${colorNewRound}`;
      firstTurn(playerTwo);
      changePictureOfDice();



      break;
    case 3:
      console.log('wybór kości do zmiany gracza pierwszego');
      break;
    case 4:
      console.log('wybór kości do zmiany gracza drugiego');
      break;
    case 5:
      secondRoundPOne.style.color = `${colorNewRound}`;
      break;
    case 6:
      secondRoundPTwo.style.color = `${colorNewRound}`;
      break;
    case 7:
      firstRoundPOne.style.color = 'initial';
      firstRoundPTwo.style.color = 'initial';
      secondRoundPOne.style.color = 'initial';
      secondRoundPTwo.style.color = 'initial';
      currentRound = 0;
      break;



  }
})



// ------------------------------------------------------------------------------------------

/*

zmienić zmienne na let



function changeTheRoll(changeTheRollPlayerX){
    var i;
    for (i=0;i<5;i++){
        changeTheRollPlayerX[i]=prompt("Czy chcesz rzucić kością " + i +" jeszcze raz?");
        if (changeTheRollPlayerX[i]=="0"){
            changeTheRollPlayerX[i]=0;
        }
    }
    return changeTheRollPlayerX;
}

function secondTurn(player,changeTheRoll){
    var j=0
    while (j<5){
        if (changeTheRoll[j]){
          player[j]=Math.ceil(Math.random()*6);
        }
        j++
        }
    return player;
    }


//zmienna testowa
var zmienna=[6,2,3,4,5];


function comparisonOfResults(playerOne, playerTwo){
    if (playerOne[0]>playerTwo[0]){
        console.log("Gracz pierwszy wygrał");
    } else if (playerOne[0]<playerTwo[0]){
        console.log("Gracz drugi wygrał");
    } else{
        if (playerOne[1]>playerTwo[1]){
            console.log("Gracz pierwszy wygrał");
        } else if (playerOne[1]<playerTwo[1]){
            console.log("Gracz drugi wygrał");
        } else {
            console.log("Remis");
        }
    }

}

//test funkcji
console.log(comparisonOfResults([4,3],[5,3]));



console.log(checkTheResult(zmienna));



// console.log("-----Pierwsza runda-----")
// console.log("Gracz pierwszy:")
// playerOne=firstTurn(playerOne);
// console.log(playerOne);
// console.log("Gracz drugi:")
// playerTwo=firstTurn(playerTwo);
// console.log(playerTwo);

// console.log("-----Druga runda-----");
// console.log("Gracz pierwszy:")
// changeTheRollPlayerOne=changeTheRoll(changeTheRollPlayerOne);
// playerOne=secondTurn(playerOne, changeTheRollPlayerOne);
// console.log(playerOne);
// console.log("Gracz drugi:");
// changeTheRollPlayerTwo=changeTheRoll(changeTheRollPlayerTwo);
// playerTwo=secondTurn(playerTwo, changeTheRollPlayerTwo);
// console.log(playerTwo);

// console.log("----lista kości które się zmieniły-----";)
// console.log(changeTheRollPlayerOne);
// console.log(changeTheRollPlayerTwo);


*/
