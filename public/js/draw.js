var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on('guess', function(data) {
    console.log('guessed');
    $('#listOfGuesses').append('<li>' + data + '</li>');
});

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

            socket.emit('guess', $(this).val());

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

