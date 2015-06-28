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

Object.defineProperty(exports, '__esModule', {
    value: true
});
var feed = {};

exports.feed = feed;
var FeedItem = function FeedItem(killer, victim, eloChange) {
    this.killer = m.prop(killer);
    this.victim = m.prop(victim);
    this.eloChange = m.prop(eloChange);

    if (this.killer().bot) this.killer().displayName = 'BOT ' + this.killer().displayName;

    if (this.victim().bot) this.victim().displayName = 'BOT ' + this.victim().displayName;
};

var Feed = Array;

feed.vm = {
    init: function init() {
        feed.vm.list = new Feed();

        feed.vm.add = function (killer, victim, eloChange) {
            m.startComputation();
            feed.vm.list.unshift(new FeedItem(killer, victim, eloChange));

            if (feed.vm.list.length > 9) {
                feed.vm.list.pop();
            }
            m.endComputation();
        };
    }
};

feed.controller = function () {
    feed.vm.init();
};

feed.view = function () {
    return m('div', [feed.vm.list.map(function (item) {
        return m('div', [m('span.name', item.killer().displayName), m('span.elo', item.killer().elo), m('span.eloChange.eloGain', '+' + item.eloChange()), m('span.killed', 'killed'), m('span.name', item.victim().displayName), m('span.elo', item.victim().elo), m('span.eloChange.eloLoss', '-' + item.eloChange())]);
    })]);
};

m.mount(document.querySelector('.feed'), feed);
},{}],3:[function(require,module,exports){
'use strict';

var _interface = require('./interface');

var _killfeed = require('./killfeed');

var _scoreboard = require('./scoreboard');

var connectionUrl = window.location.hash.substr(1) || 'http://flygfisk-stats.ineentho.com:8000/';
var socket = io(connectionUrl);
socket.on('kill', function (data) {
    var attacker = data.attacker;
    var victim = data.victim;

    _killfeed.feed.vm.add(attacker, victim, data.eloChange);
});

socket.on('scoreboardchange', function (data) {
    _scoreboard.scoreboard.vm.add(data);
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
},{"./interface":1,"./killfeed":2,"./scoreboard":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var scoreboard = {};

exports.scoreboard = scoreboard;
var ScoreboardItem = function ScoreboardItem(player) {
    this.elo = m.prop(player.elo);
    this.displayName = m.prop((player.bot ? 'BOT ' : '') + player.displayName);
    this.tag = m.prop(player.tag);
    this.kills = m.prop(player.kills);
    this.deaths = m.prop(player.deaths);
    this.recentlyChangedElo = m.prop(false);

    // Cheap, should replace elo
    this.setElo = function (newElo) {
        var up = newElo > this.elo();
        this.elo(newElo);
        m.startComputation();
        this.recentlyChangedElo(up ? 'highlightGood' : 'highlightBad');
        m.endComputation();

        var instance = this;
        window.setTimeout(function () {
            m.startComputation();
            instance.recentlyChangedElo(false);
            m.endComputation();
        }, 500);
    };
};

var Scoreboard = Array;

scoreboard.vm = {
    init: function init() {
        scoreboard.vm.list = new Scoreboard();

        scoreboard.vm.add = function (player) {
            m.startComputation();
            var eloChanged = false;
            scoreboard.vm.list.forEach(function (elem) {
                if (elem.tag() == player.tag) {
                    elem.setElo(player.elo);
                    elem.kills(player.kills);
                    elem.deaths(player.deaths);
                    eloChanged = true;
                }
            });

            if (!eloChanged) {
                scoreboard.vm.list.push(new ScoreboardItem(player));
            }
            scoreboard.vm.list.sort(function (a, b) {
                return b.elo() - a.elo();
            });
            m.endComputation();
        };
    }
};

window.scoreboard = scoreboard;

scoreboard.controller = function () {
    scoreboard.vm.init();
};

scoreboard.view = function () {
    return m('table', [m('tr', [m('th', '#'), m('th', 'PLAYER'), m('th', 'SCORE'), m('th', 'K'), m('th', 'D')]), scoreboard.vm.list.map(function (o, i) {
        return m('tr.scoreLine', [m('td.rank', i + 1), m('td.name', o.displayName()), m('td.elo', { className: o.recentlyChangedElo() ? o.recentlyChangedElo() : '' }, o.elo()), m('td.kills', o.kills()), m('td.deaths', o.deaths())]);
    })]);
};

m.mount(document.querySelector('.scoreboard'), scoreboard);
},{}]},{},[3])