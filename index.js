// Requiring the files/ npm files that are needed to run the file
const Word= require('./Word')
var inquirer= require('inquirer')

// My array of words to choose from
const myArrayForNow= ['boom','cat']

// These two empty arrays will hold the letters that the user inputs
let correctGuessedLetters= []
let incorrectGuessedLetters= []
// This will be used to help denote the end of the startGame
let requireWordEnd= false
let userGuessesLeft= 10
let usableCharacters= /[a-zA-Z]/

function startGame() {

    while (requireWordEnd) {

        // These three lines will choose a random word for the user to guess form the array above
        let randomWordGen= Math.floor(Math.random() * myArrayForNow.length)
        let randomWordChosen= myArrayForNow[randomWordGen]
        let chosenWord= new Word(randomWordChosen)

    }
    let usedWords= []
    
    if (usedWords.includes(false)) {

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Guess a letter between A and Z!',
                    name: 'userInput'
                }
            ])
            .then(answers => {
                if (!usableCharacters.includes(answers.userInput) || answers.userInput.length > 1) {

                    console.log('\nYou have entered an invalid character, please try again!\n')
                    startGame()

                } else if (incorrectGuessedLetters.includes(answers.userInput) 
                           || correctGuessedLetters.includes(answers.userInput) 
                           || answers.userInput === '') {

                            console.log('\nYou have either not guessed anything, or nothing was guessed at all!\n')
                            startGame()

                }

            })

    }

// This function will be put inside of the startGame function for when the user loses the startGame,
// or when the user is able to guess all of the words correctly
function restartGame() {

    inquirer
        .prompt([
            {
              type: 'list',
              message: 'Would you like to: ',
              choices: ['Play Again?', 'Exit'],
              name: 'restartGame'
            }
        ])
        .then(answers => {
            if (answers.restartGame === 'Play Again') {

            } else {
                return
            }
        })
        .catch(error => {

            if(error.isTtyError) {
                return
            } 

        });

}

startGame()
