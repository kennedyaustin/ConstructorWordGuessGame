const Letter= function (letter) {

    // Letter input by user
    this.letter= letter
    // Tells whether or not the user has made a guess
    this.guessed= false
    // The function below will look for user input and when they do guess a letter
    // the boolean value of the 'guessed' will be true
    this.checkGuess= function(guess) {

        if (guess === this.letter) {

            this.guessed = true

        }

    }
    this.displayLetter= function() {

        if (!this.guessed) {
            return '_'
        } else {
            return this.letter
        }

    }

}

// const blue= new Letter('a')
// console.log(blue)

module.exports= Letter