const min = 1; // Minimum value
const max = 100; // Maximum value
let randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
let guesses = [];
let numberOfGuesses = 0;

// bgm
// Get the "closed" button element
const closedButton = document.getElementById('closed');

// Add a click event listener to the "closed" button
// Create the Audio element and set its properties
const bg = new Audio('/sounds/bg.wav');
bg.volume = 0.2;
bg.loop = true;

const winnerSound = new Audio('/sounds/winner.wav');
winnerSound.volume = 0.5;
//guess sound
const buttonClickSound = new Audio('sounds/hint.wav');
buttonClickSound.volume = 0.5;

const gameOverSound = new Audio('sounds/gameover.mp3');
gameOverSound.volume = 0.5;

document.addEventListener('DOMContentLoaded', function () {
    const readModal = new bootstrap.Modal(document.getElementById('read'));
    readModal.show();
});

document.querySelector("#how").addEventListener('click', ()=>{
    // alert("test");
    const read = new bootstrap.Modal(document.getElementById('read'))
    read.show();
})




document.querySelector("#guess_btn").addEventListener('click', () => {
    const winner_modal = new bootstrap.Modal(document.getElementById('winner_modal'))
    buttonClickSound.play();

    if (numberOfGuesses === 10) {
        bg.pause();
        gameOverSound.play();
        //alert("Game over! You've reached the maximum number of guesses.");
        document.querySelector('#congrats').innerHTML = "😭Try Again😭";
        document.querySelector('#congrats_message').innerHTML = "Game over! You've reached the maximum number of guesses.";
        
        winner_modal.show();
        guessInput.value = "";
        
        return; // Exit the function if the game is over
    }

    const guessInput = document.querySelector("#guess_inp");
    const userGuess = parseInt(guessInput.value);

    if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= 100) {
        numberOfGuesses++;
        if (userGuess < randomInteger) {
            document.querySelector("#hint").innerHTML = "<p>⬆ Try Higher ⬆</p>";
        } else if (userGuess > randomInteger) {
            document.querySelector("#hint").innerHTML = "<p>⬇ Try Lower ⬇</p>";
            //alert("Try Lower");
        } else if (userGuess === randomInteger) {
            bg.pause();
            winnerSound.play();
            winner_modal.show();
        }

        guesses.push(userGuess);
        guessInput.value = ""; // Clear the input field
        displayGuessCount();
        displayGuessHistory(); // Update the guess history display
    } else {
        alert("Please enter a valid number between 1 and 100.");
        guessInput.value = "";
    }
});

const displayGuessCount = () => {
    const numGuessesParagraph = document.querySelector("#num_guess");
    numGuessesParagraph.textContent = "Number of guesses: " + numberOfGuesses;
};

const displayGuessHistory = () => {
    const guessHistoryDiv = document.querySelector("#guessed_num");
    guessHistoryDiv.innerHTML =  "Guessed numbers are: <br>" + guesses.join(", ");
};

document.querySelector('#restart').addEventListener('click', ()=> {
    randomInteger = generateRandomNumber(); // Reset the random number
    guesses = []; // Clear the guesses
    numberOfGuesses = 0; // Reset the guess count
    displayGuessHistory(); // Clear the guess history display
    displayGuessCount(); // Reset the guess count display
    document.querySelector("#hint").innerHTML = "";
    const guessInput = document.querySelector("#guess_inp");
    guessInput.value = "";
});

// ... your existing code ...

document.querySelector('#play_again').addEventListener('click', ()=>{
    bg.play();
    randomInteger = generateRandomNumber(); // Reset the random number
    guesses = []; // Clear the guesses
    numberOfGuesses = 0; // Reset the guess count
    displayGuessHistory(); // Clear the guess history display
    displayGuessCount(); // Reset the guess count display
    document.querySelector("#hint").innerHTML = "";
    
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.parentNode.removeChild(modalBackdrop); // Remove the modal backdrop
    document.body.classList.remove('modal-open'); // Remove the modal-open class from the body
    const modal = document.querySelector('.modal.show');
    modal.style.display = 'none'; // Hide the modal
    const guessInput = document.querySelector("#guess_inp");
    guessInput.value = "";
});



closedButton.addEventListener('click', () => {
    // Reset the audio to the beginning
    bg.currentTime = 0;

    // Start playing the audio
    bg.play();
});


const generateRandomNumber = () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


//hindi ko maintindihan ang kalat ng code ko


