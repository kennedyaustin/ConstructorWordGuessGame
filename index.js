// Requiring the files/ npm files that are needed to run the file
const Word= require('./Word')
var inquirer= require('inquirer')

// My array of words to choose from
const myArrayForNow= ['boom','cat']

// These three lines will choose a random word for the user to guess form the array above
let randomWordGen= Math.floor(Math.random() * myArrayForNow.length)
let randomWordChosen= myArrayForNow[randomWordGen]
let chosenWord= new Word(randomWordChosen)

// These two empty arrays will hold the letters that the user inputs
let correctGuessedLetters= []
let incorrectGuessedLetters= []
// This will be used to help denote the end of the game
let requireWordEnd= false

function game() {




}

// This function will be put inside of the game function for when the user loses the game,
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

game()