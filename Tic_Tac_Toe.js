const gameBoard = (() => {
  const gridBoard = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " ",
  ];

  const resetGameBoard = () => {
    while (gameBoardContainer.firstChild) {
      gameBoardContainer.removeChild(gameBoardContainer.firstChild);
    }
  };

  const drawGameBoard = () => {
    resetGameBoard();
    gridBoard.forEach((space, i) => {
      const spaceBoard = document.createElement("div");
      spaceBoard.id = i;
      spaceBoard.classList.add("space-board");
      spaceBoard.textContent = gridBoard[i];
      gameBoardContainer.appendChild(spaceBoard);
    });
  }

  return {
    gridBoard,
    drawGameBoard
  };
})();


const displayController = (() => {
  const currentPlayer = (figure) => figure;
  const nextPlayer = (figure) => figure;
  let inGame = true;
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = () => {
    for (let i = 0; i < winningCombination.length; i++) {
      let checkPos = [false, false, false];

      for (let j = 0; j < winningCombination[i].length; j++) {
        let aux = winningCombination[i][j];

        if (gameBoard.gridBoard[aux] === displayController.currentPlayer) {
          checkPos[j] = true;
        }
      }

      if (checkPos[0] && checkPos[1] && checkPos[2]) {
        inGame = false;
        
        document.getElementById("btn-reset").innerText = "Replay";
        document.querySelector("#winner").textContent =  `Winner is: "${displayController.currentPlayer}"`;

        return;
      } else {
        checkPos = [false, false, false];
        if (!gameBoard.gridBoard.includes(" ")){
          inGame = false;
          document.getElementById("btn-reset").innerText = "Replay";
          document.querySelector("#winner").textContent = "Draw!";
        }
      }
    }
  }

  const changePlayer = () => {
    let aux = displayController.currentPlayer;
    displayController.currentPlayer = displayController.nextPlayer;
    displayController.nextPlayer = aux;
  }

  const turn = (e) => {
    if (inGame) {
      const id = e.target.id;
      if (gameBoard.gridBoard[id] !== " ") {
        return;
      }
      gameBoard.gridBoard[id] = displayController.currentPlayer;
      gameBoard.drawGameBoard();
      checkWinner();
      changePlayer();
    }
  }

  const reset = () => {
    for (let i = 0; i < gameBoard.gridBoard.length; i++) {
      gameBoard.gridBoard[i] = " ";
    }
    document.getElementById("btn-reset").innerText = "Reset";
    document.querySelector("#winner").textContent = " ";
    gameBoard.drawGameBoard();
    inGame = true;
  }

return {turn,reset};
})();


const player = (figure) => {
  const getFigure = () => figure;
  return {getFigure}
}



const gameBoardContainer = document.querySelector("#game-board-container");
gameBoard.drawGameBoard();
const X = player("x");
const O = player("o");

displayController.currentPlayer = X.getFigure();
displayController.nextPlayer = O.getFigure();

gameBoardContainer.addEventListener('click', (e) => {
  displayController.turn(e)
});


function btnReset() {
  displayController.reset();
}


function closeModal(){
  const modal = document.querySelector("#modal");
  modal.style.display = "none";
}