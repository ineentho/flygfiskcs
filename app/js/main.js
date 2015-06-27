import test from './module'

const feed = document.querySelector('.feed');

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

const backgroundTop = document.querySelector('.background .top');
const backgroundBottom = document.querySelector('.background .bottom');

function setBg(element, map) {
    element.style.backgroundImage = 'url(static/maps/' + map + '.jpg)';
}

setBg(backgroundTop, 'ar_shoots');

window.setTimeout(function () {
    changeMap('de_dust');

    window.setTimeout(function () {
        changeMap('de_dust2');
        window.setTimeout(function () {
            changeMap('de_train')
        }, 5000);
    }, 5000);
}, 5000);

function changeMap(map) {
    console.log('change map', map);
    const url = 'static/maps/' + map + '.jpg';
    setBg(backgroundBottom, map);
    const image = new Image();
    image.src = url;
    image.addEventListener('load', function() {
        console.log('load', map);
        setBg(backgroundBottom, map);
        backgroundTop.style.opacity = 0;
        window.setTimeout(function () {
            console.log('reset', map);
            backgroundTop.style.transition = '0s';
            window.setTimeout(function () {
                backgroundTop.style.opacity = '1';
                backgroundTop.style.backgroundImage = backgroundBottom.style.backgroundImage;
                window.setTimeout(function() {
                    backgroundTop.style.transition = '2s';
                }, 0)
            }, 0);

        }, 2500);
    })
}