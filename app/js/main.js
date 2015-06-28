import { setBackgroundMap, setStatus, setStatusMessage } from './interface'
import { feed } from './killfeed'
import { scoreboard } from './scoreboard'

const connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
const socket = io(connectionUrl);
socket.on('kill', function (data) {
    const attacker = data.attacker;
    const victim = data.victim;

    feed.vm.add(attacker, victim, data.eloChange);
});

socket.on('scoreboardchange', function (data) {
    scoreboard.vm.add(data);
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