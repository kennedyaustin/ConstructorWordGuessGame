// Requiring the files/ npm packages that are needed in order to run the index.js
// file
const Word = require('./Word.js')
const inquirer = require('inquirer')

// Array of the alternative rock artists for the random word generator to choose from
const artistArray = [
  'Nickelback', 'Simple Plan'
];

// Setting global variables for later use in functions below
let currentGuessingWord
let usedWords
let randomWordChosen
let remainingGuesses
let usableCharacters= 'abcdefghijklmnopqrstuvwxyz'

// This function will choose a random artist from the artist array and use that as the next 
// word for the player to guess the letters of
function randomWordGen() {

    // These 2 variables below are what are used to make and choose the random artist
    let randomWordGenerator = Math.floor(Math.random() * artistArray.length)
    let randomWordChosen = artistArray[randomWordGenerator]
    if (usedWords.indexOf(randomWordChosen) === -1) {

      usedWords.push(randomWordChosen)
      return randomWordChosen

    } else {

      return randomWordGen()

    }
}

// This function will take care of everything that has to do with the user making a guess at the random word generated
function userGuess() {

    // Holds the _
    let letterChecker = [];
    inquirer
     .prompt([
      {
        type: 'input',
        name: 'guessedLetter',
        message: '\nRemaining Guesses: ' + remainingGuesses +
                 '\nGuess a letter A-Z!\n' +
                 currentGuessingWord.showLetters()  
      }
    ])
    .then(answers => {
        
        // This will force the user to only type characters a-z and keep them from using more than 
        // 1 character in their answers
        if (!usableCharacters.includes(answers.guessedLetter) || answers.guessedLetter.length > 1) {
            remainingGuesses++
            console.log('\nPlease only input one character A-Z!\n')
        }
        currentGuessingWord.lettersOfWord.forEach(letter => {
  
        // For each letter input by the user it will be put through the checkletter function from the letter.js file
        // to see if the letter is part of the word
        letter.checkLetter(answers.guessedLetter)
        // If it is part of the word, the letter will take the place of the corresponding _ space
        letterChecker.push(letter.getCharacter())
  
        });
          

        if (remainingGuesses > 0 && letterChecker.indexOf('_') !== -1) {
  
            remainingGuesses--
  
            if (remainingGuesses === 0) {
  
                console.log('YOU RAN OUT OF GUESSES! GAME OVER.')
                restartGame()
  
            } else {
            
                userGuess()
  
            }
  
        } else {
  
            console.log('\nCongrats! You guessed one of the artists correctly, get ready for the next one!\n')
            console.log(currentGuessingWord.showLetters() + '\n')
            playGame()
  
        }
    });
}

// This function will start the game for the user to play
function playGame() {

    // These are empty so that the funciton can generate words to put into them, so later on they can be used to end the game
    // Max of 10 guesses per artist
    usedWords= []
    randomWordChosen = ''
    remainingGuesses = 15
    // As long as the array of usedWords is shorter than the artist array the game will continue to go, choosing a different 
    // artist each time
    if (usedWords.length < artistArray.length) {

        randomWordChosen = randomWordGen()

    } else {
        
        // If the user guesses all the artists correctly this is where the game will reset itself if the user chooses
        // to do so
        console.log('\nYou\'ve guessed all of the artists names correctly, congratulations!\n')
        restartGame()

    }
    if (randomWordChosen) {

        // Chooses a new word each time a word is correctly guessed or the game is started
        currentGuessingWord = new Word(randomWordChosen)
        currentGuessingWord.pushLetters()
        userGuess()

    }

}

// This function will restart the game after either the player fails to guess one of the words correctly
// or they are able to guess all of the artists correctly
function restartGame() {

    inquirer
     .prompt([
        {
          name: 'restart',
          type: 'list',
          message: 'Would you like to: ',
          choices: ['Play Again?', 'Exit']
        }
      ])
      .then(answers => {
        if (answers.restart === 'Play Again?') {
          playGame()
        } else {
          console.log('\nSee you next time!\n');
        }
    });

}

// Callback function to start the game
playGame()