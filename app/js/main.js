import test from './module'

console.log('asd');

test();


var socket = io('http://fj100.ineentho.com:3000/');

socket.on('kill', function (data) {
    document.querySelector('.feed').innerHTML += JSON.stringify(data) + '<br>';
});