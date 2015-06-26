import test from './module'

const feed = document.querySelector('.feed');

console.log('asd');


test();

var socket = io('http://fj100.ineentho.com:3000/');
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    message(JSON.stringify(data));
});

socket.on('connect', function() {
    message('Connected');
});

socket.on('connect_error', function() {
    message('Connection error');
});

socket.on('reconnect', function() {
    message('Reconnected');
});

socket.on('reconnect_attempt', function () {
    message('reconnect_attempt');
});

socket.on('reconnecting', function (n) {
    message('reconnecting #' + n);
});

socket.on('reconnect_error', function () {
    message('reconnect_error');
});

socket.on('reconnect_failed', function () {
    message('reconnect_failed');
});