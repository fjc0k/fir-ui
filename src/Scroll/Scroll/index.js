import { toArray } from 'lodash'
import { listen, styler, value, pointer, decay, chain, action, spring, tween } from 'popmotion'
import { fakeStyler, getDirection, getDistance, getPointXY } from './utils'
import {
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  DIRECTION_HORIZONTAL_TEXT,
  DIRECTION_VERTICAL_TEXT,
  PROP_X,
  PROP_Y,
  PROP_W,
  PROP_H,
  MODE_SCROLL,
  MODE_PAGE
} from './consts'

export default class Scroll {
  constructor({
    container,
    scroll,
    top,
    bottom
  } = {}, {
    direction = DIRECTION_VERTICAL_TEXT,
    bindToWrapper = false,
    mode = MODE_SCROLL,
    pageThreshold = 0.1,
    pageIndex = 0,
    klass = {},
    on = {}
  } = {}) {
    this.isHorizontal = direction === DIRECTION_HORIZONTAL_TEXT
    this.XY = this.isHorizontal ? PROP_X : PROP_Y
    this.WH = this.isHorizontal ? PROP_W : PROP_H
    this.container = container
    this.scroll = scroll
    this.top = top
    this.bottom = bottom
    this.containerStyler = styler(container)
    this.scrollStyler = styler(scroll)
    this.topStyler = top ? styler(top) : fakeStyler
    this.bottomStyler = bottom ? styler(bottom) : fakeStyler
    this.options = { direction, bindToWrapper, mode, pageThreshold, pageIndex, klass, on }
  }

  start() {
    const {
      isHorizontal,
      XY,
      scroll,
      options: {
        bindToWrapper,
        mode,
        pageThreshold,
        pageIndex,
        on
      }
    } = this

    let localPageIndex = pageIndex

    if (mode === MODE_PAGE) {
      this.extractChildren()
    }

    if (isHorizontal) {
      this.ajustWidth()
    }

    this.setScrollXY()

    const {
      minXY,
      maxXY,
      scrollXY
    } = this

    let isValid = false
    let scrolling = false
    let originalPoint

    listen(scroll, 'touchstart').start(e => {
      isValid = true
      originalPoint = getPointXY(e)
      pointer({ [XY]: scrollXY.get() })
        .pipe(_ => _[XY])
        .start(scrollXY)
    })

    listen(bindToWrapper ? scroll : document, 'touchmove').start(e => {
      if (!isValid) return
      const direction = getDirection(originalPoint, getPointXY(e))
      if (!(
        (isHorizontal && (direction & DIRECTION_HORIZONTAL)) ||
        (!isHorizontal && (direction & DIRECTION_VERTICAL))
      )) {
        isValid = false
        scrollXY.stop()
      }
    })

    listen(bindToWrapper ? scroll : document, 'touchend', { passive: false }).start(e => {
      if (!isValid) return

      isValid = false

      e.stopPropagation()

      if (!scrolling) {
        const distance = getDistance(originalPoint, getPointXY(e))
        if (distance < 5) {
          scrollXY.stop()
          return
        }
      }

      e.preventDefault()

      scrolling = true

      if (mode === MODE_SCROLL) {
        chain(
          decay({
            from: scrollXY.get(),
            velocity: scrollXY.getVelocity(),
            power: 0.2
          }).while(nextXY => {
            if (nextXY > maxXY + 20 || nextXY < minXY - 20) {
              return false
            }
            return true
          }),
          action(({ complete }) => {
            const currentXY = scrollXY.get()
            if (currentXY >= minXY && currentXY <= maxXY) return complete()
            chain(
              spring({
                from: currentXY,
                to: currentXY > maxXY ? maxXY : minXY,
                damping: 20
              }),
              action(complete)
            ).start(scrollXY)
          }),
          action(() => {
            scrolling = false
            on.scrollEnd && on.scrollEnd(this)
          })
        ).start(scrollXY)
      } else if (mode === MODE_PAGE) {
        chain(
          decay({
            from: scrollXY.get(),
            velocity: scrollXY.getVelocity(),
            power: 0.2
          }).while(nextXY => {
            if (nextXY > maxXY + 20 || nextXY < minXY - 20) {
              return false
            }
            return true
          }),
          action(({ complete }) => {
            const currentXY = scrollXY.get()
            if (currentXY >= minXY && currentXY <= maxXY) return complete()
            chain(
              spring({
                from: currentXY,
                to: currentXY > maxXY ? maxXY : minXY,
                damping: 20
              }),
              action(complete)
            ).start(scrollXY)
          }),
          action(() => {
            scrolling = false
            on.scrollEnd && on.scrollEnd(this)
          })
        ).start(scrollXY)
      }
    })
  }

  scrollToChildByIndex(index, tweenOptions = {}) {
    const {
      isHorizontal,
      minXY,
      scroll,
      scrollXY,
      options: {
        klass
      }
    } = this

    const children = scroll.children
    const firstChild = children[0]
    if (firstChild && firstChild.classList.contains(klass.top)) {
      index += 1
    }
    const foundChild = children[index]
    if (foundChild && !foundChild.classList.contains(klass.bottom)) {
      let n0
      let nx
      if (isHorizontal) {
        n0 = firstChild.getBoundingClientRect().left
        nx = foundChild.getBoundingClientRect().left
      } else {
        n0 = firstChild.getBoundingClientRect().top
        nx = foundChild.getBoundingClientRect().top
      }
      tween({
        ...tweenOptions,
        from: scrollXY.get(),
        to: Math.max(n0 - nx, minXY)
      }).start(scrollXY)
    }
  }

  setScrollXY() {
    const {
      WH,
      XY,
      containerStyler,
      scrollStyler,
      topStyler,
      bottomStyler
    } = this

    this.minXY = (
      containerStyler.get(WH) -
      scrollStyler.get(WH) +
      bottomStyler.get(WH)
    )
    this.maxXY = -topStyler.get(WH)
    this.scrollXY = value(this.maxXY, scrollStyler.set(XY))
  }

  ajustWidth() {
    let totalWidth = 0
    toArray(this.scroll.children).forEach(child => {
      const childStyler = styler(child)
      const childWidth = childStyler.get(PROP_W)
      totalWidth += childWidth
      childStyler.set(PROP_W, childWidth)
    })
    this.scrollStyler.set(PROP_W, totalWidth)
    this.scroll.classList.add(this.options.klass.calculated)
  }

  extractChildren() {
    const {
      WH,
      scroll,
      options: {
        klass
      }
    } = this
    this.children = toArray(scroll.children)
      .filter(({ classList }) => {
        return !classList.contains(klass.top) && !classList.contains(klass.bottom)
      })
      .map(child => {
        const childStyler = styler(child)
        return {
          node: child,
          styler: childStyler,
          [WH]: childStyler.get(WH)
        }
      })
  }
}
