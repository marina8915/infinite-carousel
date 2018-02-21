import _ from 'lodash'
import './style.css'

function component() {
    //output h1
    var element = document.createElement('h1')
    element.innerHTML = _.join(['Infinite', 'carousel'], ' ')
    //array slider
    Array.prototype.forEach.call(document.getElementsByClassName('slider'), function (event) {
        event.addEventListener('mousedown', function (event) {
            //determination of slider id, activeSlider, slide
            var id = event.path[1].getAttribute('id')
            var activeSlider = document.getElementById(id)
            var slide = event.target || event.srcElement
            //assign the last element of slider class active
            var countImg = activeSlider.getElementsByTagName('img').length
            activeSlider.getElementsByTagName('img')[countImg - 1].classList.add('active')
            //check if image active then we can move it
            if (slide.classList.contains('active')) {
                //beginning of move
                document.onmousemove = function (e) {
                    slide.style.left = e.clientX + 'px'
                }
                //end of move
                document.onmouseup = document.onmouseout = function () {
                    //check if bias more then limit - change position images
                    var bias = slide.style.left.split('px')
                    var limit = 200
                    if (bias[0] > limit) {
                        slide.style.left = 0 + 'px'
                        slide.classList.remove('active')
                        activeSlider.insertBefore(slide, activeSlider.childNodes[0])
                    }
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        })
    })
    return element
}

document.body.appendChild(component())