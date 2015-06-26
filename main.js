(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _module2 = require('./module');

var _module3 = _interopRequireDefault(_module2);

var feed = document.querySelector('.feed');

console.log('asd');

(0, _module3['default'])();

var connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com/';
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