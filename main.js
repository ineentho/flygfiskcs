(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.setBackgroundMap = setBackgroundMap;
exports.setStatus = setStatus;
exports.setStatusMessage = setStatusMessage;
var statusRect = document.querySelector('.statusRect');

/**
 * Preloads the background image after which it animates the background in
 */

function setBackgroundMap(map) {
    var url = 'static/maps/' + map + '.jpg';

    var image = new Image();
    image.src = url;
    image.addEventListener('load', function () {
        changeBackground(url);
    });
}

function setStatus(status) {
    statusRect.style.background = status;
}

function setStatusMessage(message) {
    statusRect.title = message;
}

function changeBackground(url) {
    var imageElem = document.createElement('div');
    imageElem.className = 'hidden';
    imageElem.style.backgroundImage = 'url(' + url + ')';

    var parent = document.querySelector('.background');
    parent.appendChild(imageElem);

    // Make sure that there are no old images cluttering the DOM
    if (parent.childElementCount > 2) {
        parent.removeChild(parent.firstElementChild);
    }

    window.setTimeout(function () {
        imageElem.className = '';
    }, 0);
}
},{}],2:[function(require,module,exports){
'use strict';

var _interface = require('./interface');

var feed = document.querySelector('.feed');

var connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
var socket = io(connectionUrl);
function message(data) {
    feed.innerHTML = data + '<br>' + feed.innerHTML;
}
socket.on('kill', function (data) {
    var attacker = data.attacker;
    var victim = data.victim;

    attacker.elo = Math.round(attacker.elo * 100) / 100;
    victim.elo = Math.round(victim.elo * 100) / 100;
    data.eloChange = Math.round(data.eloChange * 100) / 100;

    var msg = attacker.displayName + '[' + attacker.elo + '] (<span style=\'color:green\'>+' + data.eloChange + ')</span> killed\n        ' + victim.displayName + '[' + victim.elo + '] (<span style=\'color:red\'>-' + data.eloChange + '</span>)';
    message(msg);
});

socket.on('map', function (map) {
    (0, _interface.setBackgroundMap)(map);
});

socket.on('connect', function () {
    (0, _interface.setStatus)('green');
    (0, _interface.setStatusMessage)('Connected');
});

socket.on('reconnect', function () {
    (0, _interface.setStatus)('green');
    (0, _interface.setStatusMessage)('Connected');
});

socket.on('reconnecting', function (n) {
    (0, _interface.setStatusMessage)('Reconnecting (attempt #' + n + ')');
});
},{"./interface":1}]},{},[2])