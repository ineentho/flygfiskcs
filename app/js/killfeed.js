export const feed = {};

const FeedItem = function (killer, victim, eloChange) {
    this.killer = m.prop(killer);
    this.victim = m.prop(victim);
    this.eloChange = m.prop(eloChange);
};

const Feed = Array;

feed.vm = {
    init: function () {
        feed.vm.list = new Feed();

        feed.vm.add = function (killer, victim, eloChange) {
            m.startComputation();
            feed.vm.list.unshift(new FeedItem(killer, victim, eloChange));

            if (feed.vm.list.length > 9) {
                feed.vm.list.pop();
            }
            m.endComputation();
        }
    }
};

feed.controller = function () {
    feed.vm.init();
};

feed.view = function () {
    return m('div', [
        feed.vm.list.map(function (item) {
            return m('div', [
                m('span.name', item.killer().displayName),
                m('span.elo', item.killer().elo),
                m('span.eloChange.eloGain', '+' + item.eloChange()),
                m('span.killed', 'killed'),
                m('span.name', item.victim().displayName),
                m('span.elo', item.victim().elo),
                m('span.eloChange.eloLoss', '-' + item.eloChange())
            ])
        })
    ]);
};


m.mount(document.querySelector('.feed'), feed);