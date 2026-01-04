const readline = require("readline");

// Words list
const words = ["javascript", "nodejs", "hangman", "programming", "developer"];

// Hangman drawings (0–6 wrong guesses)
const hangmanStages = [
`
  +---+
      |
      |
      |
      |
      |
=========`,
`
  +---+
  O   |
      |
      |
      |
      |
=========`,
`
  +---+
  O   |
  |   |
      |
      |
      |
=========`,
`
  +---+
  O   |
 /|   |
      |
      |
      |
=========`,
`
  +---+
  O   |
 /|\\  |
      |
      |
      |
=========`,
`
  +---+
  O   |
 /|\\  |
 /    |
      |
      |
=========`,
`
  +---+
  O   |
 /|\\  |
 / \\  |
      |
      |
=========`
];

let word = "";
let guessedLetters = [];
let remainingAttempts = 6;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Reset game state
function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    console.log("\nNew game started!");
    askGuess();
}

// Display hangman + word
function displayState() {
    console.log(hangmanStages[6 - remainingAttempts]);

    let display = "";
    for (let char of word) {
        display += guessedLetters.includes(char) ? char + " " : "_ ";
    }
    console.log("\nWord:", display.trim());
    console.log("Guessed letters:", guessedLetters.join(", "));
    console.log("Remaining attempts:", remainingAttempts);
}

// Check win condition
function checkWin() {
    return word.split("").every(char => guessedLetters.includes(char));
}

// Process guess
function processGuess(letter) {
    if (guessedLetters.includes(letter)) {
        console.log("Letter already guessed.");
        return;
    }

    guessedLetters.push(letter);

    if (!word.includes(letter)) {
        remainingAttempts--;
        console.log("Wrong guess!");
    } else {
        console.log("Correct guess!");
    }
}

// Ask for user input
function askGuess() {
    displayState();

    rl.question("\nGuess a letter: ", (input) => {
        const letter = input.toLowerCase();

        if (!/^[a-z]$/.test(letter)) {
            console.log("Please enter one valid letter.");
            return askGuess();
        }

        processGuess(letter);

        if (checkWin()) {
            console.log(`\nYou WON! The word was: ${word}`);
            return askRestart();
        }

        if (remainingAttempts === 0) {
            console.log(hangmanStages[6]);
            console.log(`\nGame OVER! The word was: ${word}`);
            return askRestart();
        }

        askGuess();
    });
}

// Ask to restart
function askRestart() {
    rl.question("\nPlay again? (y/n): ", (answer) => {
        if (answer.toLowerCase() === "y") {
            resetGame();
        } else {
            console.log("Goodbye!");
            rl.close();
        }
    });
}

// Start game
console.log("Welcome to Hangman!");
resetGame();
