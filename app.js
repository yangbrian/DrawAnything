var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var io = require("socket.io")();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var words = ['time', 'issue', 'year', 'side', 'people', 'kind', 'way', 'head', 'day', 'house', 'man', 'service', 'thing', 'friend', 'woman', 'father', 'life', 'power', 'child', 'hour', 'world', 'game', 'school', 'line', 'state', 'end', 'family', 'member', 'student', 'law', 'group', 'car', 'country', 'city', 'problem', 'community', 'hand', 'name', 'part', 'president', 'place', 'team', 'case', 'minute', 'week', 'idea', 'company', 'kid', 'system', 'body', 'program', 'information', 'question', 'back', 'work', 'parent', 'government', 'face', 'number', 'others', 'night', 'level', 'monster', 'office', 'point', 'door', 'home', 'health', 'water', 'person', 'room', 'art', 'mother', 'war', 'area', 'history', 'money', 'party', 'story', 'result', 'fact', 'change', 'month', 'morning', 'lot', 'reason', 'right', 'research', 'study', 'girl', 'book', 'guy', 'eye', 'food', 'job', 'moment', 'word', 'air', 'business', 'teacher'];


var currentWord = 'house';
console.log('The current word is: ' + currentWord + '\n');

// Socket
io.on('connection', function(client) {
  //console.log('Client connected...');

  client.on('join', function(data) {
    //console.log(data);
    client.emit('messages', 'Hello from server');
  });

  client.on('guess', function(data) {
    console.log('User guessed ' + data + '\n');

    if (data == currentWord) {
      client.emit('guessResult', 'CORRECT');
      client.broadcast.emit('guess', 'A user guessed correctly!');
    } else {
      client.emit('guessResult', 'INCORRECT');
      client.broadcast.emit('guess', data);
    }

  });

  client.on('newWord', function(data) {
    currentWord = words[parseInt(Math.random() * (words.length))];
    console.log('The new word is: ' + currentWord + '\n');
  });

});

module.exports = app;
