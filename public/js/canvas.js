/**
 * Created by Stanley on 9/26/2015.
 */
(function () {
    "use strict";
    var canvas = document.getElementById("kim");
    canvas.width = 900;
    canvas.height = 500;
    var context = canvas.getContext("2d");
    var mouseIsDown = false;
    //var counter = 0;
    //var ws = new WebSocket("ws://" + window.location.host + "/socket");

    ///function messageReceived(evt) {
    //    var point = JSON.parse(evt.data);
    //    drawPoint(point.x, point.y);
    //}
    //ws.onmessage = messageReceived;

    //function drawPoint(centerX, centerY) {
    function point(centerX, centerY) {
        var radius = 5;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'black';
        context.fill();
        context.lineWidth = 0;
        context.strokeStyle = 'black';
        context.stroke();
    }

    var top = canvas.offsetTop;
    var left = canvas.offsetLeft;

    function mouseMove(evt) {
        if (mouseIsDown) {
            //ws.send(JSON.stringify({
            //    x: evt.pageX - left,
            //    y: evt.pageY - top,
            //}))
            point(evt.pageX - left, evt.pageY - top - 31);
        }
    }

    canvas.addEventListener("mousedown", function () {
        mouseIsDown = true;
        canvas.addEventListener("mousemove", mouseMove);
    });

    window.addEventListener("mouseup", function () {
        mouseIsDown = false;
        canvas.removeEventListener("mousemove", mouseMove)
    });
})();