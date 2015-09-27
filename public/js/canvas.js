/**
 * Created by Stanley on 9/26/2015.
 */
var context;
var colorBrush = 'black';
var radius = 5;
var canvas;
(function () {
    "use strict";
    canvas = document.getElementById("kim");
    canvas.width = 780;
    canvas.height = 500;
    context = canvas.getContext("2d");
    var mouseIsDown = false;

    //var colorBrush = 'black';

    //var counter = 0;
    //var ws = new WebSocket("ws://" + window.location.host + "/socket");

    ///function messageReceived(evt) {
    //    var point = JSON.parse(evt.data);
    //    drawPoint(point.x, point.y);
    //}
    //ws.onmessage = messageReceived;

    socket.on('draw', function(data) {
        var oldRadius = radius;
        var oldColor = colorBrush;

        radius = data.radius;
        colorBrush = data.color;
        point(data.x, data.y);

        colorBrush = oldColor;
        radius = oldRadius;
    });

    //function drawPoint(centerX, centerY) {
    function point(centerX, centerY) {
        //var radius = 5;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = colorBrush;
        context.fill();
        context.lineWidth = 0;
        context.strokeStyle = colorBrush;
        context.stroke();
    }

    var top = canvas.offsetTop;
    var left = canvas.offsetLeft;

    function mouseMove(evt) {
        if (mouseIsDown) {
            socket.emit('draw', {
                x: evt.pageX - left,
                y: evt.pageY - top - 4,
                color: colorBrush,
                radius: radius
            });
            point(evt.pageX - left, evt.pageY - top - 4);
        }
    }

    canvas.addEventListener("mousedown", function () {
        //if (!drawer) return;
        mouseIsDown = true;
        canvas.addEventListener("mousemove", mouseMove);
    });

    window.addEventListener("mouseup", function () {
        //if (!drawer) return;
        mouseIsDown = false;
        canvas.removeEventListener("mousemove", mouseMove)
    });
})();