'use strict';

const statusRect = document.querySelector('.statusRect');


/**
 * Preloads the background image after which it animates the background in
 */
export function setBackgroundMap(map) {
    const url = 'static/maps/' + map + '.jpg';

    const image = new Image();
    image.src = url;
    image.addEventListener('load', function () {
        changeBackground(url);
    });
}

export function setStatus(status) {
    statusRect.style.background = status;
}

export function setStatusMessage(message) {
    statusRect.title = message;
}

function changeBackground(url) {
    const imageElem = document.createElement('div');
    imageElem.className = 'hidden';
    imageElem.style.backgroundImage = `url(${url})`;

    const parent = document.querySelector('.background');
    parent.appendChild(imageElem);

    // Make sure that there are no old images cluttering the DOM
    if (parent.childElementCount > 2) {
        parent.removeChild(parent.firstElementChild);
    }

    window.setTimeout(function () {
        imageElem.className = '';
    }, 0);
}