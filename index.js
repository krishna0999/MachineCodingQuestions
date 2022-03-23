const snakes = [
  [62, 5],
  [33, 6],
  [49, 9],
  [88, 16],
  [41, 20],
  [56, 53],
  [98, 64],
  [93, 73],
  [95, 75],
];

const ladders = [
  [2, 37],
  [27, 46],
  [10, 32],
  [51, 68],
  [61, 79],
  [65, 84],
  [71, 91],
  [81, 100],
];

class Player {
  constructor(name, sum, num, prev) {
    this.name = name;
    this.sum = sum;
    this.num = num;
    this.prev = prev;
  }

  diceRoll() {
    console.log(
      `${this.name} rolled a ${this.num} and moved from ${this.sum} to ${
        this.sum + this.num
      }`
    );
  }
}

let player1 = new Player("Krishna", 0, 0, 0);
let player2 = new Player("Rohan", 0, 0, 0);

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e) => {
  console.log(e.target.id);
  movePlayer(checkPlayer(e));
});

function createBoxes(i) {
  const box = document.createElement("div");
  box.setAttribute("class", "main__containerBox");
  box.setAttribute("id", i);
  let text = document.createTextNode(i);
  box.appendChild(text);

  const mainContainer = document.querySelector(".main__container");

  mainContainer.appendChild(box);
}

for (let i = 100; i >= 1; i--) {
  createBoxes(i);
}

let isPlayer1 = "";
const player1Btn = document.getElementById("player1");
const player2Btn = document.getElementById("player2");

function checkPlayer(e) {
  if (e.target.id === "player1") {
    isPlayer1 = e.target.id;
  } else if (e.target.id === "player2") {
    isPlayer1 = e.target.id;
  }
  return isPlayer1;
}

function throwDice() {
  return Math.ceil(Math.random() * 6);
}

function movePlayer(pl) {
  let randomNumber = throwDice();
  if (pl === "player1") {
    player1.num = randomNumber;
    player1.diceRoll();
    player1.prev = player1.sum;
    checkSum(player1, randomNumber);
    highlightPlayer(player1);
    resetStyles(player1);
  } else if (pl === "player2") {
    player2.num = randomNumber;
    player2.diceRoll();
    player2.prev = player2.sum;
    checkSum(player2, randomNumber);
    highlightPlayer(player2);
    resetStyles(player2);
  }

  console.log(player1, player2);
  //   return { player1, player2 };
}

function checkSum(plr, randomNumber) {
  if (plr.sum + randomNumber > 100) {
    plr.sum = plr.sum;
  } else {
    plr.sum += randomNumber;
    moveLadder(plr);
    moveSnakes(plr);
  }

  if (plr.sum === 100) {
    console.log(`${plr.name} won the game`);
  }
}

function moveLadder(plr) {
  for (let i = 0; i < ladders.length; i++) {
    if (plr.sum === ladders[i][0]) {
      plr.sum = ladders[i][1];
    }
  }
}

function moveSnakes(plr) {
  for (let i = 0; i < snakes.length; i++) {
    if (plr.sum === snakes[i][0]) {
      plr.sum = snakes[i][1];
    }
  }
}

function highlightPlayer(plr) {
  let box = document.getElementById(`${plr.sum}`);
  //   console.log(box);
  //   console.log(plr.name);
  if (plr.name === "Krishna") {
    box.style.background = "red";
    box.style.color = "white";
  } else if (plr.name === "Rohan") {
    box.style.color = "white";
    box.style.background = "purple";
  }
}

function resetStyles(plr) {
  let box = document.getElementById(`${plr.prev}`);

  box.style.background = "white";
  box.style.color = "black";
}
