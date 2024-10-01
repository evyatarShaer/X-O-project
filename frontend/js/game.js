document.addEventListener("DOMContentLoaded", () => {
  const gameCells = document.querySelectorAll(".game-cell");
  const opponentNameElement = document.getElementById("opponent-name");
  const gameHistoryElement = document.getElementById("game-history");
  const newGameButton = document.getElementById("new-game-button");
  const gameTypeSelect = document.getElementById("game-type");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;
  let isComputerOpponent = false;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(e) {
    const cellIndex = parseInt(e.target.getAttribute("data-index"));

    if (gameBoard[cellIndex] !== "" || !gameActive) return;

    placeMark(cellIndex);

    if (checkWin()) {
      gameActive = false;
      updateGameHistory(`${currentPlayer} ניצח!`);
    } else if (checkDraw()) {
      gameActive = false;
      updateGameHistory("תיקו!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (isComputerOpponent && currentPlayer === "O") {
        setTimeout(computerMove, 500);
      }
    }
  }

  function placeMark(cellIndex) {
    gameBoard[cellIndex] = currentPlayer;
    gameCells[cellIndex].textContent = currentPlayer;
  }

  function computerMove() {
    if (!gameActive) return;

    let availableMoves = gameBoard.reduce((acc, cell, index) => {
      if (cell === "") acc.push(index);
      return acc;
    }, []);

    if (availableMoves.length > 0) {
      let randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      placeMark(randomMove);

      if (checkWin()) {
        gameActive = false;
        updateGameHistory(`${currentPlayer} ניצח!`);
      } else if (checkDraw()) {
        gameActive = false;
        updateGameHistory("תיקו!");
      } else {
        currentPlayer = "X";
      }
    }
  }

  function checkWin() {
    return winningCombinations.some((combination) => {
      return combination.every((index) => {
        return gameBoard[index] === currentPlayer;
      });
    });
  }

  function checkDraw() {
    return gameBoard.every((cell) => cell !== "");
  }

  function updateGameHistory(result) {
    gameHistoryElement.textContent += result + " ";
  }

  function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    gameCells.forEach((cell) => {
      cell.textContent = "";
    });
    isComputerOpponent = gameTypeSelect.value === "computer";
    setOpponentName(isComputerOpponent ? "מחשב" : "שחקן 2");
  }

  function setOpponentName(name) {
    opponentNameElement.textContent = name;
  }

  function startNewGame() {
    resetGame();
    updateGameHistory("משחק חדש התחיל. ");
  }

  gameCells.forEach((cell, index) => {
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
  });

  newGameButton.addEventListener("click", startNewGame);

  gameTypeSelect.addEventListener("change", () => {
    startNewGame();
  });

  startNewGame();

  window.gameModule = {
    startNewGame,
    setOpponentName,
  };
});
