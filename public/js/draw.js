var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
});

socket.on('guess', function(data) {
    toastr.info(data);
    $('#listOfGuesses').append('<li>' + data + '</li>');
});

socket.on('guessResult', function(data) {
    var value = $('input[name="userGuess"]').val();
    if(data == 'CORRECT') {
        toastr.success('YOU GOT IT! The answer was <b> ' + value + '</b>!');
        $('#listOfGuesses').append('<li class="success">YOU GOT IT! The answer was <b> ' + value + '</b>!</li>');
    }
    else {
        $('#listOfGuesses').append('<li><strong>You</strong>: ' + value + '</li>');
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

    var can = document.getElementById('kim');
    var ctx = can.getContext('2d');
    var img = new Image();
    img.src = can.toDataURL();

    $('#redButton').on('click', function() {
        colorBrush = 'red'
    })

    $('#blueButton').on('click', function() {
        colorBrush = 'blue'
    })

    $('#greenButton').on('click', function() {
        colorBrush = 'green'
    })

    $('#blackButton').on('click', function() {
        colorBrush = 'black'
    })

    $('#yellowButton').on('click', function() {
        colorBrush = 'yellow'
    })

    $('#orangeButton').on('click', function() {
        colorBrush = 'orange'
    })

    $('#purpleButton').on('click', function() {
        colorBrush = 'purple'
    })

    $('#whiteButton').on('click', function() {
        colorBrush = 'white'
    })

    $('#smallButton').on('click', function() {
        radius = 2
    })

    $('#mediumButton').on('click', function() {
        radius = 5
    })

    $('#largeButton').on('click', function() {
        radius = 8
    })

    $('#hugeButton').on('click', function() {
        radius = 11
    })
});

