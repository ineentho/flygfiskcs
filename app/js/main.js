import test from './module'

const feed = document.querySelector('.feed');

console.log('asd');


test();

const connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
var socket = io(connectionUrl);
message('Connecting to ' + connectionUrl);
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    message('Kill: ' + JSON.stringify(data));
});

socket.on('connect', function() {
    message('Connected via ' + socket.io.engine.transport.name);
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