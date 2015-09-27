/**
 * Created by Kevin on 9/26/2015.
 */
var guesses = [];

$(document).ready(function() {
    $('#input').on('keyup', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {

            guesses.push($('#input').val());
            console.log(guesses);
            $('#listOfGuesses').append('<li>' + $('#input').val() + '</li>');

            $('#input').val('');
        }
    });
});