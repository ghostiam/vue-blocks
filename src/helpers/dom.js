/**
 * @param element {HTMLElement}
 * @return {{top: number, left: number}}
 */
export function getOffsetRect (element) {
  let box = element.getBoundingClientRect()

  let scrollTop = window.pageYOffset
  let scrollLeft = window.pageXOffset

  let top = box.top + scrollTop
  let left = box.left + scrollLeft

  return {top: Math.round(top), left: Math.round(left)}
}

export default {
  getOffsetRect
}
