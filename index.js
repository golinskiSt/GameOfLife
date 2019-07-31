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
        td.style.backgroundColor = "black";
      } else {
        td.style.backgroundColor = "white";
      }
      document.getElementById((i + 1).toString()).appendChild(td);
    }
  }
}

function makeAlive(x, y) {
  board[x][y].isAlive = true;
  document.getElementById(`${x}i${y}j`).style.backgroundColor = "black";
  console.log(board[x][y].isAlive);
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
function chceckState(x, y) {
  let neighbours = 0;
  //warunki brzegowe
  if (x === 0 && y === 0) {
    if (board[0][1] === true) this.neighbours = this.neighbours + 1;
    if (board[1][0] === true) this.neighbours = this.neighbours + 1;
    if (board[1][1] === true) this.neighbours = this.neighbours + 1;
  } else if (x === 0 && y === 24) {
    if (board[0][23] === true) neighbours = neighbours + 1;
    if (board[1][24] === true) neighbours = neighbours + 1;
    if (board[1][23] === true) neighbours = neighbours + 1;
  } else if (x === 24 && y === 0) {
    if (board[23][0] === true) neighbours = neighbours + 1;
    if (board[23][1] === true) neighbours = neighbours + 1;
    if (board[24][1] === true) neighbours = neighbours + 1;
  } else if (x === 24 && y === 24) {
    if (board[23][23] === true) neighbours = neighbours + 1;
    if (board[24][23] === true) neighbours = neighbours + 1;
    if (board[23][24] === true) neighbours = neighbours + 1;
  } else if (x === 0 && y != 0) {
    for (let i = x; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if (board[i][j].isAlive === true) neighbours = neighbours + 1;
      }
    }
  } else if (x != 0 && y === 0) {
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y; j < y + 1; j++) {
        if (board[i][j].isAlive === true) neighbours = neighbours + 1;
      }
    }
  } else if (x === 24 && y != 0) {
    for (let i = x - 1; i < x; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if (board[i][j].isAlive === true) neighbours = neighbours + 1;
      }
    }
  } else if (x != 0 && y === 24) {
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y; j++) {
        if (board[i][j].isAlive === true) neighbours = neighbours + 1;
      }
    }
  } else if (x != 0 && y != 0 && x != 23 && y != 23) {
    //pozostałe
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if (board[i][j].isAlive === true) neighbours = neighbours + 1;
      }
    }
  }
  if (neighbours === 2 || neighbours === 3) {
    board[x][y] = true;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = "black";
  } else if ((board[x][y] = false && neighbours === 3)) {
    board[x][y] = true;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = "black";
  } else {
    board[x][y] = false;
    document.getElementById(`${x}i${y}j`).style.backgroundColor = "white";
  }
}
function start() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      chceckState(i, j);
    }
  }
}
function startGame() {
  console.log(board);
  if (this.gameState === false) {
    this.gameState = true;
  } else {
    this.gameState = false;
  }
  while (this.gameState) {
    setTimeout(start(),5000);
    this.gameState = false; 
  }
}

function createLife() {
  let loop = 0;
  while (loop < 100) {
    var a = Math.floor(Math.random() * 25) + 0;
    var b = Math.floor(Math.random() * 25) + 0;
    board[a][b].isAlive = true;
    document.getElementById(`${a}i${b}j`).style.backgroundColor = "black";
    loop++;
  }
}

let startBttn = document.createElement("button");
startBttn.innerHTML = "Generate";
startBttn.onmousedown = startGame();
