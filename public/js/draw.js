var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on('guess', function(data) {
    console.log('guessed');
    $('#listOfGuesses').append('<li>' + data + '</li>');
});

socket.on('guessResult', function(data) {
    var value = $('#input').val();
    if(data == 'CORRECT') {
        $('#correctGuess').append('<p>Correct! The answer was <b> ' + value + '</b>!</p>');
    }
    else {
        $('#listOfGuesses').append('<li>' + value + '</li>');
    }

    $('#input').val('');
});

var guesses = [];


$(document).ready(function() {

    //var randomWord = Math.random() * (words.length);
    //randomWord = parseInt(randomWord);
    //console.log(randomWord);
    //console.log(words);
    //$('#guessThis').append('<p>' + words[randomWord] + '<p>');

    $('#input').on('keyup', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {

            socket.emit('guess', $(this).val());

            guesses.push($('#input').val());
            console.log(guesses);


        }
    });

    $('#newWord').on('click', function() {
        socket.emit('newWord');
    })
});

