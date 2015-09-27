/**
 * Created by Kevin on 9/26/2015.
 */


$(document).ready(function() {
    $("#input").on('keyup', function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) {
            console.log('mpoo');
            $('#input').val('');
        }
    });
});