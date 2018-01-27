import {getOffsetRect} from './dom'

/**
 * @param event {MouseEvent}
 * @param element {HTMLElement}
 * @return {{x: number, y: number}}
 */
export function getMousePosition (element, event) {
  let mouseX = event.pageX || event.clientX + document.documentElement.scrollLeft
  let mouseY = event.pageY || event.clientY + document.documentElement.scrollTop

  let offset = getOffsetRect(element)
  let x = mouseX - offset.left
  let y = mouseY - offset.top

  return {
    x: x,
    y: y
  }
}

export default {
  getMousePosition
}
