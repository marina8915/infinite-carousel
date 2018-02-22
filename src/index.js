import _ from 'lodash'
import './style.css'

function component() {
    //output h1
    var element = document.createElement('h1')
    element.innerHTML = _.join(['Infinite', 'carousel'], ' ')
    var sliders = document.getElementsByClassName('slider')
    //array slider
    Array.prototype.forEach.call(sliders, function (event, i) {
        //show indicators
        var countSlides = sliders[i].getElementsByTagName('img').length
        for (var j = 0; j < countSlides; j++) {
            var el = document.createElement('li')
            if (j === countSlides - 1) {
                el.classList.add('active')
            }
            sliders[i].querySelector('ul.indicators').insertBefore(el, sliders[i].querySelector('ul.indicators').childNodes[0])
        }
        event.addEventListener('mousedown', function (event) {
            //determination of carousel, slide
            var carousel = document.getElementById(event.path[1].getAttribute('id'))
            var slide = event.target || event.srcElement
            //assign the last element of slider class active
            var countImg = carousel.getElementsByTagName('img').length
            carousel.getElementsByTagName('img')[countImg - 1].classList.add('active')
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
                        carousel.insertBefore(slide, carousel.childNodes[0])
                        //change indicator
                        var indicators = carousel.querySelector('ul.indicators').getElementsByTagName('li')
                        var indicatorsCount = indicators.length
                        for (var k = 0; k < indicatorsCount; k++) {
                            if (indicators[k].classList.contains('active')) {
                                indicators[k].classList.remove('active')
                                if (k === indicatorsCount - 1) {
                                    indicators[0].classList.add('active')
                                } else {
                                    indicators[k + 1].classList.add('active')
                                }
                                break
                            }
                        }
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