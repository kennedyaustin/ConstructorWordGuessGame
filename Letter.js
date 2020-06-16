const Letter= function (letter) {

    this.letter= letter,
    this.guessed= false,
    // The function below will look for user input and when they do guess a letter
    // the boolean value of the 'guessed' will be true
    this.checkGuess= function(guess) {

        if (guess === this.letter) {

            this.guessed = true

        }

    }

}

module.exports= Letter