export const scoreboard = {};

const ScoreboardItem = function (player) {
    this.elo = m.prop(player.elo);
    this.displayName = m.prop((player.bot ? 'BOT ' : '') + player.displayName);
    this.tag = m.prop(player.tag);
    this.kills = m.prop(player.kills);
    this.deaths = m.prop(player.deaths);
    this.recentlyChangedElo = m.prop(false);

    // Cheap, should replace elo
    this.setElo = function (newElo) {
        const up = newElo > this.elo();
        this.elo(newElo);
        m.startComputation();
        this.recentlyChangedElo(up ? 'highlightGood' : 'highlightBad');
        m.endComputation();


        const instance = this;
        window.setTimeout(function () {
            m.startComputation();
            instance.recentlyChangedElo(false);
            m.endComputation();
        }, 500);
    }
};

const Scoreboard = Array;

scoreboard.vm = {
    init: function () {
        scoreboard.vm.list = new Scoreboard();

        scoreboard.vm.add = function (player) {
            m.startComputation();
            let eloChanged = false;
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
        }
    }
};

window.scoreboard = scoreboard;

scoreboard.controller = function () {
    scoreboard.vm.init();
};

scoreboard.view = function () {
    return m('table', [
        m('tr', [
            m('th', '#'),
            m('th', 'PLAYER'),
            m('th', 'SCORE'),
            m('th', 'K'),
            m('th', 'D')
        ]),
        scoreboard.vm.list.map(function (o, i) {
            return m('tr.scoreLine', [
                m('td.rank', i + 1),
                m('td.name', o.displayName()),
                m('td.elo', {className: o.recentlyChangedElo() ? o.recentlyChangedElo() : ''}, o.elo()),
                m('td.kills', o.kills()),
                m('td.deaths', o.deaths())
            ])
        })
    ]);
};


m.mount(document.querySelector('.scoreboard'), scoreboard);