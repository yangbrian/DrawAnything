var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on('guess', function(data) {
    console.log('guessed');
    $('#listOfGuesses').append('<li>' + data + '</li>');
});

socket.on('guessResult', function(data) {
    var value = $('input[name="userGuess"]').val();
    if(data == 'CORRECT') {
        $('#correctGuess').append('<p>Correct! The answer was <b> ' + value + '</b>!</p>');
    }
    else {
        $('#listOfGuesses').append('<li>You incorrectly guessed ' + value + '</li>');
    }

    $('input[name="userGuess"]').val('');
});

var guesses = [];

$(document).ready(function() {

    var nickname = $('input[name="nickname"]');
    if(typeof(Storage) !== "undefined") {
        if (!sessionStorage.drawAnythingName)
            sessionStorage.drawAnythingName = 'Anonymous';
        nickname.on('keyup', function(e) {
            var code = e.keyCode || e.which;
            if(code == 13) {
                sessionStorage.drawAnythingName = $(this).val();

                $(this).val('');
            }

        })

        nickname.val(sessionStorage.drawAnythingName);
    } else {
        nickname.hide();
    }

    //var randomWord = Math.random() * (words.length);
    //randomWord = parseInt(randomWord);
    //console.log(randomWord);
    //console.log(words);
    //$('#guessThis').append('<p>' + words[randomWord] + '<p>');

    $('input[name="userGuess"]').on('keyup', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {

            socket.emit('guess', { guess: $(this).val(), name: sessionStorage.drawAnythingName });

            guesses.push($('#input').val());
            console.log(guesses);


        }
    });

    $('#newWord').on('click', function() {
        socket.emit('newWord');
    })
});

