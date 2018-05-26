import { calc, styler, physics, pointer, transform, tween, value, listen } from 'popmotion'
const { applyOffset, clamp, nonlinearSpring, pipe } = transform

export default class Carousel {
  constructor(container, options) {
    this.slider = container
    this.options = options
  }

  start() {
    const slider = this.slider
    const items = this.getItems()
    const sliderVisibleWidth = this.getSliderVisibleWidth()
    const totalItemsWidth = this.getTotalItemsWidth()
    const [minXOffset, maxXOffset] = this.getXOffsetRange()
    const clampXOffset = clamp(minXOffset, maxXOffset)
    const sliderStyler = styler(slider)
    const sliderX = value(0, sliderStyler.set('x'))
    let action
    let touchOrigin = { x: 0, y: 0 }
    listen(slider, 'touchstart mouseup').start(() => {
      if (action) action.stop()

    })
  }

  getItems() {
    return this.slider.children
  }

  getSliderVisibleWidth() {
    return this.slider.offsetWidth
  }

  getTotalItemsWidth() {
    const { items } = this
    const { left } = items[0].getBoundingClientRect()
    const { right } = items[items.length - 1].getBoundingClientRect()
    return right - left
  }

  getXOffsetRange(sliderVisibleWidth, totalItemsWidth) {
    return [
      -(totalItemsWidth - sliderVisibleWidth),
      0
    ]
  }

  static angleIsVertical(angle) {
    const isUp = (
      angle <= -90 + 45 &&
      angle >= -90 - 45
    )
    const isDown = (
      angle <= 90 + 45 &&
      angle >= 90 - 45
    )
    return (isUp || isDown)
  }
}
