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
            var slides = sliders[i].getElementsByTagName('img')
            var slidesCount = slides.length
            for (var j = 0; j < slidesCount; j++) {
                //add attribute slide for image
                slides[j].setAttribute('slide', j)
                //create indicator
                var el = document.createElement('li')
                el.setAttribute('for-slide', j)
                if (j === slidesCount - 1) {
                    el.classList.add('active')
                }
                sliders[i].querySelector('ul.indicators').insertBefore(el, sliders[i].querySelector('ul.indicators').childNodes[0])
            }
            //mousedown for image
            event.addEventListener('mousedown', function (event) {
                if (event.path[1].getAttribute('id')) {
                    //determination of start position, limit, carousel, slide
                    var start = event.target.getBoundingClientRect().x
                    var limit = event.target.getBoundingClientRect().width / 2
                    var carousel = document.getElementById(event.path[1].getAttribute('id'))
                    var slide = event.target || event.srcElement
                    //assign the last element of slider class active
                    var countImg = carousel.getElementsByTagName('img').length
                    carousel.getElementsByTagName('img')[countImg - 1].classList.add('active')
                    //check if image active then we can move it
                    if (slide.classList.contains('active')) {
                        //beginning of move
                        document.onmousemove = function (e) {
                            var drag = e.clientX - limit - start
                            if (drag > 0) {
                                slide.style.transition = 'left 250ms ease-in all'
                                slide.style.left = drag + 20 + 'px'
                            } else if (drag < 0) {
                                slide.style.transition = 'right 250ms ease-in all'
                                slide.style.left = drag  - 20 + 'px'
                            }
                        }
                        //end of move
                        document.onmouseup = document.onmouseout = function (e) {
                            //check if bias more then limit - change position images
                            var bias = slide.style.left.split('px')
                            var biasLeft = Math.abs(+bias[0])
                            //var diffDrag = Math.abs(start - e.clientX)
                            console.log(start, limit, biasLeft)
                            if (biasLeft > limit) {
                                slide.classList.remove('active')
                                slide.style.transition = ''
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
                            slide.style.left = 0 + 'px'
                            document.onmousemove = null
                            document.onmouseup = null
                        }
                    }
                }
                //if pressed on indicator then change slide
                if (event.path[1].classList.contains('indicators')) {
                    if (!event.path[0].classList.contains('active')) {
                        var carousel = document.getElementById(event.path[2].getAttribute('id'))
                        var indexNext = +event.path[0].getAttribute('for-slide')
                        var indexPrev = +slides[slidesCount - 1].getAttribute('slide')
                        while (indexPrev !== indexNext) {
                            carousel.insertBefore(slides[slidesCount - 1], carousel.childNodes[0])
                            indexPrev = +slides[slidesCount - 1].getAttribute('slide')
                        }
                        event.path[1].querySelector('li.active').classList.remove('active')
                        event.path[0].classList.add('active')
                    }
                }
            })
        }
    )
    return element
}

document.body.appendChild(component())