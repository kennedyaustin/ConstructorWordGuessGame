const Letter= require('./Letter')

const Word= function(input) {

    this.currentWord= []
    // Uses Letter constructor from Letter.js to push letters into the currentWord
    // array
    for (var i = 0; i < this.currentWord.length; i++) {

        let letter= new Letter(input[i])
        this.currentWord.push(input)

    }
    // Function below will check whether or not the letter guessed by the player
    // is part of the current word
    this.playerGuess= function(playerInput) {

        for (var i = 0; i < this.currentWord.length; i++) {

            this.currentWord[i].checkGuess(playerInput)

        }

    }

}

module.exports= Word