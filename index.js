// Requiring the files/ npm packages that are needed in order to run the index.js
// file
const Word = require('./Word.js')
const inquirer = require('inquirer')

// Array of the different minerals for the random word generator to choose from
const mineralArray = [
  'ruby', 'sapphire', 'diamond', 'quartz', 'coal', 'amber', 'copper', 'pyrite', 'fluorite'
];

// Setting global variables for later use in functions below
let currentGuessingWord
let usedWords
let randomWordChosen
let remainingGuesses
let usableCharacters= 'abcdefghijklmnopqrstuvwxyz'

// This function will choose a random mineral from the mineral array and use that as the next 
// word for the player to guess the letters of
function randomWordGen() {

    // These 2 variables below are what are used to make and choose the random mineral
    let randomWordGenerator = Math.floor(Math.random() * mineralArray.length)
    let randomWordChosen = mineralArray[randomWordGenerator]
    // If the index doesn't exist to begin with then push a newly generated word into the array
    if (usedWords.indexOf(randomWordChosen) === -1) {

      usedWords.push(randomWordChosen)
      return randomWordChosen

    // Otherwise gen a new word
    } else {

      return randomWordGen()

    }
}

// This function will take care of everything that has to do with the user making a guess at the random word generated
function userGuess() {

    let letterChecker = []
    inquirer
     .prompt([
      {
        type: 'input',
        name: 'guessedLetter',
        message: '\nRemaining Guesses: ' + remainingGuesses +
                 '\nGuess a letter a-z!\n' +
                 currentGuessingWord.showLetters()  
      }
    ])
    .then(answers => {
    
        // This will force the user to only type characters a-z and keep them from using more than 
        // 1 character in their answers
        if (!usableCharacters.includes(answers.guessedLetter) || answers.guessedLetter.length > 1 ) {
            remainingGuesses++
            console.log('\nPlease only input one character a-z!\n')
        } else if (answers.guessedLetter < 1) {
            remainingGuesses++
            console.log('\nPlease type in at least one letter a-z!\n')
        } 
        currentGuessingWord.lettersOfWord.forEach(letter => {
        // For each letter input by the user it will be put through the checkletter function from the letter.js file
        // to see if the letter is part of the word
        letter.checkLetter(answers.guessedLetter)
        // If it is part of the word, the letter will take the place of the corresponding _ space
        letterChecker.push(letter.getCharacter())
  
        });
          
        // If the remaining guesses the user has is > 0 and the number of _ is greater than -1 the game will continue
        if (remainingGuesses > 0 && letterChecker.indexOf('_') > -1) {
  
            remainingGuesses--
            // Decrease guesses until the number reaches 0 and then shows a game over log for the user
            if (remainingGuesses === 0) {
  
                console.log('Aw man, you ran out of guesses! Game over!')
                restartGame()
  
            // Otherwise allow the user to keep guessing
            } else {
            
                userGuess()
  
            }
            
        // When all the _ are gone the user will be shown the congratulatory text and be given the next
        // prompt
        } else {
  
            console.log('\nCongrats! You guessed one of the minerals! correctly, get ready for the next one!\n')
            console.log(currentGuessingWord.showLetters() + '\n')
            playGame()
  
        }
    });
}

// This function will start the game for the user to play
function playGame() {

    // These are empty so that the funciton can generate words to put into them, so later on they can be used to end the game
    // Max of 10 guesses per mineral
    usedWords= []
    randomWordChosen = ''
    remainingGuesses = 10
    // As long as the array of usedWords is shorter than the mineral array the game will continue to go, choosing a different 
    // mineral each time
    if (usedWords.length < mineralArray.length) {

        randomWordChosen = randomWordGen()

    } else {
        
        // If the user guesses all the minerals correctly this is where the game will reset itself if the user chooses
        // to do so
        console.log('\nYou\'ve guessed all of the minerals correctly, congratulations!\n')
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
// or they are able to guess all of the minerals correctly
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