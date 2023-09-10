"use strict";
//PLAYER
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//SCORE
let score_player0 = document.querySelector("#score--0");
let score_player1 = document.querySelector("#score--1");
let current_score0 = document.querySelector("#current--0");
let current_score1 = document.querySelector("#current--1");

//BUTTON
const roll_dice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const new_btn = document.querySelector(".btn--new");

//DIce ลูกเต๋า
let dice = document.querySelector(".dice");

let score, currentScore, ActivePlayer, playing;

const start_game = function () {
  score = [0, 0];
  currentScore = 0;
  ActivePlayer = 0;
  playing = true;

  //กำหนดค่าเริ่มต้น
  score_player0.textContent = 0;
  score_player1.textContent = 0;
  current_score0.textContent = 0;
  current_score1.textContent = 0;

  //set add remove hidden class and winner avtive player
  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
};

//เรียกใช้ฟังก์ชั่น ตอนเริ่มต้น
start_game();

//ฟังก์ชัน switch
const switch_player = function () {
  document.getElementById(`current--${ActivePlayer}`).textContent = 0;
  currentScore = 0;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

roll_dice.addEventListener("click", function () {
  if (playing) {
    //RANDOM
    const random_number = Math.trunc(Math.random() * 6 + 1);
    dice.src = `dice-${random_number}.png`;
    dice.classList.remove("hidden");
    if (random_number !== 1) {
      currentScore += random_number;
      document.getElementById(`current--${ActivePlayer}`).textContent =
        currentScore;
    } else {
      //if = 1 swtch player
      switch_player();
    }
  }
});

hold.addEventListener("click", function () {
  if (playing) {
    //คะแนนของผู้เล่นที่ active ขณะนี้ score[0] = score0 ,score[1] = score1
    //นำ currentscore มาเก็บใน score ผู้เล่น
    score[ActivePlayer] += currentScore;
    document.getElementById(`score--${ActivePlayer}`).textContent =
      score[ActivePlayer];
    if (score[ActivePlayer] >= 100) {
      //ห้ามมีการเล่นต่อ
      playing = false;
      dice.classList.add("hidden");
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${ActivePlayer}`)
        .checkVisibility.classList.remove("player--active");
    } else {
      switch_player();
    }
  }
});

new_btn.addEventListener("click", start_game);
