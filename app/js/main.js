import { setBackgroundMap, setStatus, setStatusMessage } from './interface'

const feed = document.querySelector('.feed');

const connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
var socket = io(connectionUrl);
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    message('Kill: ' + JSON.stringify(data));
});

socket.on('map', function (map) {
    setBackgroundMap(map);
});

socket.on('connect', function() {
    setStatus('green');
    setStatusMessage('Connected');
});

socket.on('reconnect', function() {
    setStatus('green');
    setStatusMessage('Connected');
});

socket.on('reconnecting', function (n) {
    setStatusMessage('Reconnecting (attempt #' + n + ')');
});