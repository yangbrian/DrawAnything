/**
 * Created by Kevin on 9/26/2015.
 */
var guesses = [];
var words = ['time', 'issue', 'year', 'side', 'people', 'kind', 'way', 'head', 'day', 'house', 'man', 'service', 'thing', 'friend', 'woman', 'father', 'life', 'power', 'child', 'hour', 'world', 'game', 'school', 'line', 'state', 'end', 'family', 'member', 'student', 'law', 'group', 'car', 'country', 'city', 'problem', 'community', 'hand', 'name', 'part', 'president', 'place', 'team', 'case', 'minute', 'week', 'idea', 'company', 'kid', 'system', 'body', 'program', 'information', 'question', 'back', 'work', 'parent', 'government', 'face', 'number', 'others', 'night', 'level', 'monster', 'office', 'point', 'door', 'home', 'health', 'water', 'person', 'room', 'art', 'mother', 'war', 'area', 'history', 'money', 'party', 'story', 'result', 'fact', 'change', 'month', 'morning', 'lot', 'reason', 'right', 'research', 'study', 'girl', 'book', 'guy', 'eye', 'food', 'job', 'moment', 'word', 'air', 'business', 'teacher']

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