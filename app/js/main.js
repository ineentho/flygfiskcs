import { setBackgroundMap, setStatus, setStatusMessage } from './interface'

const feed = document.querySelector('.feed');

const connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
const socket = io(connectionUrl);
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    const attacker = data.attacker;
    const victim = data.victim;

    attacker.elo = Math.round(attacker.elo * 100) / 100;
    victim.elo = Math.round(victim.elo * 100) / 100;
    data.eloChange = Math.round(data.eloChange * 100) / 100;

    let msg = `${attacker.displayName}[${attacker.elo}] (<span style=\'color:green\'>+${data.eloChange})</span> killed
        ${victim.displayName}[${victim.elo}] (<span style=\'color:red\'>-${data.eloChange}</span>)`;
    message(msg);
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