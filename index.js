// Requiring the files/ npm files that are needed to run the file
const Word= require('./Word')
var inquirer= require('inquirer')

// My array of words to choose from
const myArrayForNow= ['boom','cat']

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