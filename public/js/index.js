/**
 * Created by Kevin on 9/26/2015.
 */
var guesses = [];
var words = ['dog', 'cat', 'pizza', 'donut', 'ice cream']

$(document).ready(function() {

    var randomWord = Math.random() * (words.length);
    randomWord = parseInt(randomWord);
    console.log(randomWord);
    console.log(words);
    $('#guessThis').append('<p>' + words[randomWord] + '<p>');

    $('#input').on('keyup', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {

            guesses.push($('#input').val());
            console.log(guesses);

            if($('#input').val().toLowerCase() === words[randomWord]) {
                $('#correctGuess').append('<p>Correct! The answer was <b> ' + words[randomWord] + '</b>!</p>');
            }
            else {
                $('#listOfGuesses').append('<li>' + $('#input').val() + '</li>');
            }

            $('#input').val('');
        }
    });
});