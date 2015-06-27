(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var feed = document.querySelector('.feed');

var connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
var socket = io(connectionUrl);
message('Connecting to ' + connectionUrl);
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    message('Kill: ' + JSON.stringify(data));
});

socket.on('connect', function () {
    message('Connected via ' + socket.io.engine.transport.name);
});

socket.on('connect_error', function () {
    message('Connection error');
});

socket.on('reconnect', function () {
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

var backgroundTop = document.querySelector('.background .top');
var backgroundBottom = document.querySelector('.background .bottom');

function setBg(element, map) {
    element.style.backgroundImage = 'url(static/maps/' + map + '.jpg)';
}

setBg(backgroundTop, 'ar_shoots');

window.setTimeout(function () {
    changeMap('de_dust');

    window.setTimeout(function () {
        changeMap('de_dust2');
        window.setTimeout(function () {
            changeMap('de_train');
        }, 5000);
    }, 5000);
}, 5000);

function changeMap(map) {
    console.log('change map', map);
    var url = 'static/maps/' + map + '.jpg';
    setBg(backgroundBottom, map);
    var image = new Image();
    image.src = url;
    image.addEventListener('load', function () {
        console.log('load', map);
        setBg(backgroundBottom, map);
        backgroundTop.style.opacity = 0;
        window.setTimeout(function () {
            console.log('reset', map);
            backgroundTop.style.transition = '0s';
            window.setTimeout(function () {
                backgroundTop.style.opacity = '1';
                backgroundTop.style.backgroundImage = backgroundBottom.style.backgroundImage;
                window.setTimeout(function () {
                    backgroundTop.style.transition = '2s';
                }, 0);
            }, 0);
        }, 2500);
    });
}
},{"./module":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function () {
    console.log('test');
};

module.exports = exports['default'];
},{}]},{},[1])