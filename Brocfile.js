var funnel        = require('broccoli-funnel'),
    mergeTrees    = require('broccoli-merge-trees'),
    babel         = require('broccoli-babel-transpiler'),
    compileJade   = require('broccoli-jade'),
    compileStylus = require('broccoli-stylus-single'),
    browserify    = require('broccoli-browserify');


var js = babel('./app/js', {});

js = browserify(js, {
    entries: ['./main.js'],
    outputFile: 'main.js'
});

var socketIO = funnel('./node_modules/socket.io-client/socket.io.js', {
    destDir: 'libs/socket.io.js'
});

var mithril = funnel('./node_modules/mithril/mithril.min.js', {
    destDir: 'libs/mithril.min.js'
});

var stylus = compileStylus('./app/styl/', 'main.styl', './main.css');

var jade = compileJade('./app/jade');

var staticFiles = funnel('./app/static', {
    destDir: 'static'
});


module.exports = mergeTrees([jade, staticFiles, js, stylus, mithril, socketIO]);