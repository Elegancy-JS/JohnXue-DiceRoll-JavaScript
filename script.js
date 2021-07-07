'use strict';
const player1Score = document.querySelector(`#score--0`);
const player2Score = document.getElementById(`score--1`);
const player1Current = document.querySelector(`#current--0`);
const player2Current = document.querySelector(`#current--1`);

const play1 = document.querySelector(`.player--0`);
const play2 = document.querySelector(`.player--1`);

const dice = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

let currentScore = 0;
let scoreArray = [0, 0];
let winner = false;

//reset all scores change background colour to begin a NEW game
const resetScores = function () {
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  winner = false;
  dice.classList.toggle(`hidden`); //hide the dice pic
  play1.classList.remove(`player--winner`);
  play2.classList.remove(`player--winner`);
  play1.classList.add(`player--active`);
  play2.classList.remove(`player--active`);
};
resetScores(); //Always start a new game when first open the page

//switch player, lighten up the active player and dim the other
const switchPlayer = function () {
  if (play1.classList.contains(`player--active`)) {
    play1.classList.toggle(`player--active`);
    play2.classList.toggle(`player--active`);
    player1Current.textContent = 0;
    currentScore = 0;
  } else {
    play2.classList.toggle(`player--active`);
    play1.classList.toggle(`player--active`);
    player2Current.textContent = 0;
    currentScore = 0;
  }
};

//rolling dice, showing the dice picture according to rolling result
const rollDice = function () {
  if (!winner) {
    let i = Math.trunc(Math.random() * 6) + 1;
    // console.log(i);
    dice.classList.remove(`hidden`); //show picture of dice
    dice.src = `dice-${i}.png`;
    if (i !== 1) {
      if (play1.classList.contains(`player--active`)) {
        currentScore = currentScore + i;
        player1Current.textContent = currentScore;
      } else {
        currentScore = currentScore + i;
        player2Current.textContent = currentScore;
      }
    } else {
      switchPlayer(); //calling switchPlayer function when a player gets 1
    }
  } else {
    alert(`Game is over, click "NEW GAME"!`);
  }
};
btnRoll.addEventListener(`click`, function () {
  rollDice();
});

//calculate and display the total points of each player
const holdScore = function () {
  if (play1.classList.contains(`player--active`)) {
    player1Score.textContent =
      Number(player1Score.textContent) + Number(player1Current.textContent);
  } else {
    player2Score.textContent =
      Number(player2Score.textContent) + Number(player2Current.textContent);
  }
  scoreArray[0] = player1Score.textContent;
  scoreArray[1] = player2Score.textContent;
  switchPlayer(); //calling switchPlayer function
};

//
btnHold.addEventListener(`click`, function () {
  if (!winner) {
    holdScore();
    console.log(scoreArray[0], scoreArray[1]);
    for (let i = 0; i < scoreArray.length; i++) {
      //if there is a winner, hide the dice pic
      if (scoreArray[i] >= 20) {
        alert(`Winner: player${i + 1}`);
        // console.log(`Winner: player${i + 1}`);
        dice.classList.toggle(`hidden`);
        console.log(`i=${i}`);
        i === 0
          ? play1.classList.toggle(`player--winner`)
          : play2.classList.toggle(`player--winner`);
        winner = true;
      }
    }
  } else {
    alert(`Game is over, click "NEW GAME"!`);
  }
});

//Start a new game by clicking "NEW GAME"
btnNew.addEventListener(`click`, function () {
  resetScores();
});
