import _ from 'lodash';
import './style.css';

function component() {
    var element = document.createElement('h1');

    element.innerHTML = _.join(['Infinite', 'carousel'], ' ');

    return element;
}

document.body.appendChild(component());