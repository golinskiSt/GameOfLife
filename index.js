class Cell {
  constructor(isAlive) {
    this._isAlive = isAlive;
  }
  set isAlive(isAlive) {
    this._isAlive = isAlive;
  }
  get isAlive() {
    return this._isAlive;
  }
}

var board = [];
let gameState = false;

function generateBoard() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      var td = document.createElement("DIV");

      td.onmousedown = function() {
        makeAlive(i, j);
      };
      td.id = `${i}i${j}j`;
      td.style.border = "1px black solid";
      td.style.height = "20px";
      td.style.width = "20px";
      td.classList.add("float-left");
      if (board[i][j].isAlive) {
        td.style.backgroundColor = getRandomColor();
      } else {
        td.style.backgroundColor = "white";
      }
      document.getElementById((i + 1).toString()).appendChild(td);
    }
  }
}

function makeAlive(x, y) {
  board[x][y].isAlive = true;
  document.getElementById(`${x}i${y}j`).style.backgroundColor = getRandomColor();
}

function generateMap() {
  for (let i = 0; i < 25; i++) {
    board[i] = [];
    for (let j = 0; j < 25; j++) {
      board[i][j] = new Cell(false);
    }
  }
  document.getElementById("generateButton").disabled = true;
  generateBoard();
}
function chceckState(x , y) {
  let checkBoard = board;
  let neighbours = 0;
  //warunki brzegowe
  if (x === 0 && y === 0) {
    if (this.board[0][1].isAlive === true) neighbours++;
    if (board[1][0].isAlive === true) neighbours++;
    if (board[1][1].isAlive === true) neighbours++;
  } else if (x === 0 && y === 24) {
    if (board[0][23].isAlive === true) neighbours++;
    if (board[1][24].isAlive === true) neighbours++;
    if (board[1][23].isAlive === true) neighbours++;
  } else if (x === 24 && y === 0) {
    if (board[23][0].isAlive === true) neighbours++;
    if (board[23][1].isAlive === true) neighbours++;
    if (board[24][1].isAlive === true) neighbours++;
  } else if (x === 24 && y === 24) {
    if (board[23][23].isAlive === true) neighbours++;
    if (board[24][23].isAlive === true) neighbours++;
    if (board[23][24].isAlive === true) neighbours++;
  } else if (x === 0 && y != 0) {
    for (let i = x; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if(j === y && i === x) continue;
        if (board[i][j].isAlive === true) neighbours++;
      }
    }
  } else if (x != 0 && y === 0) {
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y; j < y + 1; j++) {
        if(i === x && j === y) continue;
        if (board[i][j].isAlive === true) neighbours++;
      }
    }
  } else if (x === 24 && y != 0) {
    for (let i = x - 1; i < x; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if(i === x && j === y) continue;
        if (board[i][j].isAlive === true) neighbours++;
      }
    }
  } else if (x != 0 && y === 24) {
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y; j++) {
        if(i === x && j === y) continue;
        if (board[i][j].isAlive === true) neighbours++;
      }
    }
  } else /*if (x !== 0 && y !== 0 && x !== 24 && y !== 24)*/ {
    //pozostałe
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if(i===x && j === y)
          continue;
        if (board[i][j].isAlive === true) neighbours++;
      }
    }
  }
  console.log(neighbours);
  if (neighbours == 2 || neighbours == 3 && board[x][y].isAlive == true) {
    document.getElementById(`${x}i${y}j`).style.backgroundColor = getRandomColor();
  } else if (board[x][y].isAlive === false && neighbours === 3) {
    checkBoard[x][y].isAlive = true;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = getRandomColor();
  } else if (neighbours <= 1 && board[x][y].isAlive === true) {
    checkBoard[x][y].isAlive = false;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = "white";
  } else if (neighbours >= 4 && board[x][y].isAlive === true) {
    checkBoard[x][y].isAlive = false;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = "white";
  }
  neighbours = 0;
}
function start() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      chceckState(i, j);
    }
  }
  board = checkBoard;
}
function startGame() {
  start();
}

function createLife() {
  let loop = 0;
  while (loop < 100) {
    var a = Math.floor(Math.random() * 25) + 0;
    var b = Math.floor(Math.random() * 25) + 0;
    board[a][b].isAlive = true;
    document.getElementById(`${a}i${b}j`).style.backgroundColor = getRandomColor();
    loop++;
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let startBttn = document.createElement("button");
startBttn.innerHTML = "Generate";
startBttn.onmousedown = startGame();
