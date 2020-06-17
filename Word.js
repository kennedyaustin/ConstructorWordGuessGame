const Letter = require('./Letter.js');

function Word(currentWord) {

    this.lettersOfWord = []
    this.currentWord = currentWord
    // This takes in the users userInput and checks whether it's part of the current word or not,
    // passes it through the checkLetter function from letter.js
    this.userGuess = function(userInput) {

        this.lettersOfWord.forEach(letter => {

            letter.checkLetter(userInput)

        });

    }
    // This function will show the letters that the user guesses as they are guessed
    this.showLetters = function() {

        // Initially there are no shown letters other than the _ since the user hasn't made a userInput
        let shownLetters = ''
        this.lettersOfWord.forEach(letter => {
            
            // The ' ' at the end creates the spaces in between the characters
            shownLetters += letter.getCharacter() + ' '

        }) 
        return shownLetters
        
    }
    // This function will push the letters that the user is able to correctly userInput into the empty spaces that are shown to them
    // via the '_' spaces.
    this.pushLetters = function() {

        // Splits each letter of the current word up into an array and stores it in this variable
        let currentWordArray = this.currentWord.split('')
        // For each letter of the current word when a letter is correctly guessed that letter will replace the _
        for(let i = 0; i < currentWordArray.length; i++) {

            let correctLetter = new Letter(currentWordArray[i])
            this.lettersOfWord.push(correctLetter)
            
        }

    }
    
}

module.exports = Word;