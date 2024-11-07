"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let score0,
  score1,
  currentScore0,
  currentScore1,
  activePlayer,
  playing,
  check,
  scoreHold,
  compChoice;
let dice = 0;

document.querySelector("#name--1").innerHTML = "Computer";
function start() {
  compChoice = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore0 = 0;
  currentScore1 = 0;
  score0 = 0;
  score1 = 0;
  check = 0;
  playing = true;
  scoreHold = 0;
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  btnHold.disabled = false;
  btnRoll.disabled = false;
}

start();

function randomDice() {
  return (dice = Math.trunc(Math.random() * 6) + 1);
}

function comp() {
  randomDice();
  diceEl.classList.remove("hidden");
  diceEl.src = `./img/dice-${dice}.png`;
  if (dice === 1) {
    currentScore1 = 0;
    current1El.textContent = currentScore1;
    compChoice = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
    btnHold.disabled = false;
    btnRoll.disabled = false;
  } else {
    if (score1 >= 100) {
      score1El.textContent = score1;
      player1El.classList.add("player--winner");
    }
    if (compChoice <= 9) {
      currentScore1 += dice;
      current1El.textContent = currentScore1;
      compChoice = currentScore1;
      check = currentScore1 + scoreHold;
      if (check >= 100) {
        player1El.classList.add("player--winner");
        score1 += currentScore1;
        score1El.textContent = score1;
      } else if (check < 100) setTimeout(() => comp(), 1000);
    } else {
      if (check >= 100) {
        player1El.classList.add("player--winner");
        score1 += currentScore1;
        score1El.textContent = score1;
      } else {
        currentScore1 += dice;
        current1El.textContent = currentScore1;
        score1 += currentScore1;
        scoreHold = score1;
        score1El.textContent = score1;
        compChoice = 0;
        setTimeout(() => (current1El.textContent = 0), 200);
        currentScore1 = 0;
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
        btnHold.disabled = false;
        btnRoll.disabled = false;
      }
    }
  }
}

btnRoll.addEventListener("click", () => {
  if (playing) {
    randomDice();
    diceEl.classList.remove("hidden");
    diceEl.src = `./img/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore0 += dice;
      current0El.textContent = currentScore0;
    } else {
      currentScore0 = 0;
      current0El.textContent = currentScore0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      btnHold.disabled = true;
      btnRoll.disabled = true;
      setTimeout(() => comp(), 1500);
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    score0 += currentScore0;
    score0El.textContent = score0;
    if (score0 >= 100) {
      playing = false;
      player0El.classList.add("player--winner");
      player0El.classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      currentScore0 = 0;
      current0El.textContent = currentScore0;
      player0El.classList.toggle("player--active");
      player1El.classList.toggle("player--active");
      btnHold.disabled = true;
      btnRoll.disabled = true;
      setTimeout(() => comp(), 1500);
    }
  }
});

btnNew.addEventListener("click", start);
