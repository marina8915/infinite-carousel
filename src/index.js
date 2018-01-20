import _ from 'lodash';
import './style.css';

function component() {
    var element = document.createElement('h1');
    element.innerHTML = _.join(['Infinite', 'carousel'], ' ');

    Array.prototype.forEach.call(document.getElementsByClassName('slider'), function (event) {
        event.addEventListener('mousedown', function (event) {
            let id = event.path[1].getAttribute('id');
            let countSlide = document.getElementById(id).getElementsByTagName('img');
            let items = countSlide.length;
            let sliderWidth = items * 400;
            document.getElementById(id).style.width = sliderWidth + 'px';
            let slide = event.target || event.srcElement;
            //slide.style.left = 0;
            document.onmousemove = function (e) {
                slide.style.left = e.pageX + 'px';
            }
            document.onmouseup = document.onmouseout = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            }
        })
    })

    return element;
}

document.body.appendChild(component());