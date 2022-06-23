//Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

//Variables
const rulesBtn = document.querySelector(".rules-btn");
const closeBtn = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameContainer = document.querySelector(".game");
const resultsContainer = document.querySelector(".results");
const resultContainers = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreCounter = document.querySelector(".score__number");
let score = 0;

//GAME LOGIC
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultContainers.forEach((resultContainer, index) => {
    setTimeout(() => {
      resultContainer.innerHTML = `
       <div class='choice ${results[index].name}'>
         <img src='images/icon-${results[index].name}.svg' alt='${results[index].name}' />
       </div>
      `;
    }, index * 1000);
  });

  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "you win";
      resultContainers[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultContainers[1].classList.toggle("winner");
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
    }
  }, 1000);

  resultWinner.classList.toggle("hidden");
  resultsContainer.classList.toggle("show-winner");
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreCounter.innerText = score;
}

//Play Again Button
playAgainBtn.addEventListener("click", () => {
  gameContainer.classList.toggle("hidden");
  resultsContainer.classList.toggle("hidden");

  resultContainers.forEach((resultContainer) => {
    resultContainer.innerHTML = "";
    resultContainer.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsContainer.classList.toggle("show-winner");
});

//Event Listeners for Rules show and hide function
rulesBtn.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

closeBtn.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
