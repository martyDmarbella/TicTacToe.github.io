// Define the sound effect
const clickSound = new Audio();
clickSound.src = './img&audio/click.mp3';
clickSound.load();

// Add a click event listener to each square element
for (let i = 0; i < 9; i++) {
  const square = document.getElementById(i.toString());
  square.addEventListener('click', function () {
    // Play the sound effect
    clickSound.currentTime = 0;
    clickSound.play();

    // Handle the square click event
    handleClick(i);
  });
}

// To add animation in css

for (let i = 0; i < 9; i++) {
  const square = document.getElementById(i.toString());
  square.addEventListener('click', function () {
    // Play the sound effect
    clickSound.currentTime = 0;
    clickSound.play();

    // Add animation to the square
    square.classList.add('square-animation');

    // Remove the animation after 1 second
    setTimeout(function () {
      square.classList.remove('square-animation');
    }, 1000);

    // Handle the square click event
    handleClick(i);
  });
}

const player = document.getElementById("player");
const audioToggle = document.getElementById("audio-toggle");

audioToggle.addEventListener("click", function () {
  if (player.paused) {
    player.play();
    audioToggle.classList.remove("fa-volume-off");
    audioToggle.classList.add("fa-volume-up");
  } else {
    player.pause();
    audioToggle.classList.remove("fa-volume-up");
    audioToggle.classList.add("fa-volume-off");
  }
});

// Initialize variables
let board = ['', '', '', '', '', '', '', '', ''];
let playerScore = 0;
let computerScore = 0;
let currentPlayer = 'X';
let gameOver = false;

// Function so I can style x and o in css
function render() {
  for (let i = 0; i < board.length; i++) {
    const square = document.getElementById(i.toString());
    square.innerText = board[i];
    square.classList.remove("x", "o"); // Remove any existing class
    if (board[i] === "X") {
      square.classList.add("x");
    } else if (board[i] === "O") {
      square.classList.add("o");
    }
  }
}

// Function to check if the game is over
function checkGameOver() {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      if (board[i] === 'X') {
        alert('Player wins!');
        playerScore = 1;
        document.getElementById('playerScore').innerText = playerScore.toString();
      } else {
        alert('Computer wins!');
        computerScore = 1;
        document.getElementById('computerScore').innerText = computerScore.toString();
      }
      return board[i];
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      if (board[i] === 'X') {
        alert('Player wins!');
        playerScore += 1;
        document.getElementById('playerScore').innerText = playerScore.toString();
      } else {
        alert('Computer wins!');
        computerScore = 1;
        document.getElementById('computerScore').innerText = computerScore.toString();
      }
      return board[i];
    }
  }
  // Check diagonals
  if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
    if (board[0] === 'X') {
      alert('Player wins!');
      playerScore ++;
      document.getElementById('playerScore').innerText = playerScore.toString();
    } else {
      alert('Computer wins!');
      computerScore = 1;
      document.getElementById('computerScore').innerText = computerScore.toString();
    }
    return board[0];
  }
  if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
    if (board[2] === 'X') {
      alert('Player wins!');
      playerScore = 1;
      document.getElementById('playerScore').innerText = playerScore.toString();
    } else {
      alert('Computer wins!');
      computerScore = 1;
      document.getElementById('computerScore').innerText = computerScore.toString();
    }
    return board[2];
  }
  // Check if the board is full
  if (!board.includes('')) {
    alert('Tie game!');
    return 'tie';
  }
  // If none of the above conditions are met, the game is not over
  return false;
}

// Function to handle the player's move
function playerMove(square) {
  if (gameOver || board[square] !== '') {
    return;
  }
  board[square] = currentPlayer;
  render();
  const result = checkGameOver();
  if (result) {
    gameOver = true;
    if (result === 'tie') {
      alert('Tie game!');
    } else if (result === 'X') { 
      document.getElementById('playerScore').innerText = playerScore.toString();
    } else if (result === 'O') {
      document.getElementById('computerScore').innerText = computerScore.toString();
    }
    return;
  }
  currentPlayer = 'O';
  setTimeout(computerMove, 200);
}

function computerMove() {
  if (gameOver) {
    return;
  }
  currentPlayer = 'O';
  // Choose a random empty square
  let square;
  do {
    square = Math.floor(Math.random() * 9);
  } while (board[square] !== '');
  board[square] = currentPlayer;
  render();
  if (checkGameOver()) {
    gameOver = true;
    document.getElementById('computerScore').innerText = computerScore.toString();
    return;
  }
  currentPlayer = 'X';
}


// Function to reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  render();
}

// Function to reset the score
function resetScore() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById('playerScore').innerText = playerScore.toString();
  document.getElementById('computerScore').innerText = computerScore.toString();
}

// Add event listeners
for (let i = 0; i < 9; i++) {
  document.getElementById(i.toString()).addEventListener('click', function () {
    playerMove(i);
  });
}
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('resetScore').addEventListener('click', resetScore);

// Render the initial board
render();