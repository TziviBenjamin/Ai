const readline = require("readline");

// List of words for the game
const words = ["javascript", "nodejs", "hangman", "programming", "developer"];

// Game state variables
let word = "";
let guessedLetters = [];
let remainingAttempts = 6;

// Create interface to read input from console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Select a random word and reset game state
function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingAttempts = 6;
    console.log("\nNew game started!");
    startRound();
}

// Display the current state of the word
function displayWord() {
    let display = "";
    for (let char of word) {
        if (guessedLetters.includes(char)) {
            display += char + " ";
        } else {
            display += "_ ";
        }
    }
    console.log("\nWord: " + display.trim());
}

// Check if the user has guessed the whole word
function checkWin() {
    return word.split("").every(char => guessedLetters.includes(char));
}

// Process the user's guess
function processGuess(letter) {
    if (guessedLetters.includes(letter)) {
        console.log("You already guessed that letter.");
        return;
    }

    guessedLetters.push(letter);

    if (word.includes(letter)) {
        console.log("Correct!");
    } else {
        console.log("Wrong!");
        remainingAttempts--;
    }
}

// Ask user for a letter
function askGuess() {
    displayWord();
    console.log(`Remaining attempts: ${remainingAttempts}`);
    rl.question("Guess a letter: ", (input) => {
        const letter = input.toLowerCase();
        if (letter.length !== 1 || !letter.match(/[a-z]/)) {
            console.log("Please enter a single letter.");
        } else {
            processGuess(letter);
        }

        if (checkWin()) {
            console.log(`Congratulations! You guessed the word: ${word}`);
            askRestart();
        } else if (remainingAttempts <= 0) {
            console.log(`Game over! The word was: ${word}`);
            askRestart();
        } else {
            askGuess(); // Continue asking
        }
    });
}

// Ask if the player wants to play again
function askRestart() {
    rl.question("Do you want to play again? (y/n): ", (input) => {
        if (input.toLowerCase() === "y") {
            resetGame();
        } else {
            console.log("Thanks for playing Hangman!");
            rl.close();
        }
    });
}

// Start the round
function startRound() {
    displayWord();
    askGuess();
}

// Start the first game
function startGame() {
    console.log("Welcome to Hangman!");
    resetGame();
}

startGame();
