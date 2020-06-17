function Letter(letter) {

    this.letter = letter;
    this.correctGuess = false;
    // This will check whether the letters that are guessed are correct, which will update the boolean value if it is 
    // guessed correctly
    this.checkLetter = function(userInput) {

        // If the input the user presses = a letter in the word then the correctguess b00lean value
        // will be changed to true and the letter will now be shown to the player
        if(userInput === this.letter) {
          this.correctGuess = true;
        }
  
    }
    // This will display either the _ if the letter hasn't been guessed yet, or the letter that is guessed
    this.getCharacter = function() {

        // If correctguess is false keep the _ in view for the user to tell them that they haven't guessed
        // this letter correctly yet
        if(!this.correctGuess) {
          
            return '_';

        // Else the letter will be shown in place of the _
        } else {

            return this.letter;

        }

    }
}
  
module.exports = Letter;