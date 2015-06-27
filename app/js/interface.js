'use strict';

const backgroundTop = document.querySelector('.background .top');
const backgroundBottom = document.querySelector('.background .bottom');
const statusRect = document.querySelector('.statusRect');

export function setBackgroundMap(map) {
    changeMap(map);
}

export function setStatus(status) {
    statusRect.style.background = status;
}

export function setStatusMessage(message) {
    statusRect.title = message;
}


function setBg(element, map) {
    element.style.backgroundImage = 'url(static/maps/' + map + '.jpg)';
}

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