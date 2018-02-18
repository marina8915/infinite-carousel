import _ from 'lodash'
import './style.css'

function component() {
    //output h1
    var element = document.createElement('h1')
    element.innerHTML = _.join(['Infinite', 'carousel'], ' ')
    //array slider
    Array.prototype.forEach.call(document.getElementsByClassName('slider'), function (event) {
        event.addEventListener('mousedown', function (event) {
            //determination of slider id, slide
            var id = event.path[1].getAttribute('id')
            var slide = event.target || event.srcElement
            //beginning of move
            document.onmousemove = function (e) {
                slide.style.left = e.clientX + 'px'
                console.log(e.clientX)
            }
            //end of move
            document.onmouseup = document.onmouseout = function (e) {
                //check limit
                var limits = {
                    right: 200,
                    left: 0
                }
                if (e.clientX > limits.right || e.clientX < limits.left) {
                    document.getElementById(id).insertBefore(slide, document.getElementById(id).childNodes[0])
                }
                slide.style.left = 0 + 'px'
                document.onmousemove = null
                document.onmouseup = null
            }
        })
    })
    return element
}

document.body.appendChild(component())