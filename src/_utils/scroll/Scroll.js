import { toArray } from 'lodash'
import { listen, styler, value, pointer, tween, chain, action } from 'popmotion'
import { getDirection, getDistance, getPointXY } from './calc'
import {
  DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL,
  DIRECTION_VERTICAL_TEXT,
  PROP_X,
  PROP_Y,
  PROP_W,
  PROP_H
} from './consts'

export default class Scroll {
  originalPoint = {
    [PROP_X]: 0,
    [PROP_Y]: 0
  }

  listeners = []

  constructor({
    container,
    scroll,
    ...nodes
  } = {}, {
    direction = DIRECTION_VERTICAL_TEXT,
    bindToWrapper = false,
    klass = {},
    on = {},
    offset = {
      minXY: 0,
      maxXY: 0
    },
    ...options
  } = {}) {
    const isVertical = direction === DIRECTION_VERTICAL_TEXT
    const XY = isVertical ? PROP_Y : PROP_X
    const WH = isVertical ? PROP_H : PROP_W
    const containerStyler = styler(container)
    const scrollStyler = styler(scroll)

    this.nodes = {
      container,
      scroll,
      ...nodes
    }

    this.stylers = {
      container: containerStyler,
      scroll: scrollStyler
    }

    this.options = {
      direction,
      bindToWrapper,
      klass,
      on,
      offset,
      ...options,
      isVertical,
      XY,
      WH
    }
  }

  init() {
    if (this.beforeInit) {
      this.beforeInit()
    }

    this.refresh()

    if (this.afterInit) {
      this.afterInit()
    }
  }

  start() {
    this.init()

    if (this.beforeStart) {
      this.beforeStart()
    }

    const {
      nodes: {
        scroll: scrollNode
      },
      options: {
        isVertical,
        XY,
        bindToWrapper,
        on
      },
      scroll: {
        translateXY
      }
    } = this

    let isValid = false
    let scrolling = false

    this.listeners.push(listen(scrollNode, 'touchstart').start(e => {
      isValid = true
      this.originalPoint = getPointXY(e)
      pointer({ [XY]: translateXY.get() })
        .pipe(point => point[XY])
        .start(translateXY)
      if (this.scrollStart) {
        this.scrollStart(e, getPointXY(e))
      }
    }))

    this.listeners.push(listen(bindToWrapper ? scrollNode : document, 'touchmove').start(e => {
      if (!isValid) return
      const direction = this.getDirection(getPointXY(e))
      if (!(
        (!isVertical && (direction & DIRECTION_HORIZONTAL)) ||
        (isVertical && (direction & DIRECTION_VERTICAL))
      )) {
        isValid = false
        translateXY.stop()
      }
    }))

    this.listeners.push(listen(bindToWrapper ? scrollNode : document, 'touchend', { passive: false }).start(e => {
      if (!isValid) return
      isValid = false
      e.stopPropagation()
      if (!scrolling) {
        const distance = this.getDistance(getPointXY(e))
        if (distance < 5) {
          translateXY.stop()
          return
        }
      }
      e.preventDefault()
      scrolling = true
      const callback = () => {
        scrolling = false
        translateXY.stop()
        on.scrollEnd && on.scrollEnd(this)
      }
      if (this.scrollEnd) {
        this.scrollEnd(e, getPointXY(e)).then(callback)
      } else {
        callback()
      }
    }))

    on.afterStart && on.afterStart()
  }

  refresh() {
    const {
      options: {
        offset,
        isVertical,
        XY,
        WH
      },
      stylers: {
        container: containerStyler,
        scroll: scrollStyler
      }
    } = this

    this.listeners.forEach(listener => listener.stop())
    this.listeners = []

    if (!isVertical) {
      this.ajustScrollWidth()
    }

    this.scroll = {
      ...this.scroll,
      minXY: containerStyler.get(WH) - scrollStyler.get(WH) + offset.minXY,
      maxXY: 0 + offset.maxXY,
      translateXY: value(0 + offset.maxXY, scrollStyler.set(XY))
    }
  }

  scrollTo(targetXY, tweenOptions = {}) {
    return new Promise(resolve => {
      const {
        scroll: {
          minXY,
          maxXY,
          translateXY
        }
      } = this
      chain(
        tween({
          ...tweenOptions,
          from: translateXY.get(),
          to: Math.min(Math.max(targetXY, minXY), maxXY)
        }),
        action(resolve)
      ).start(translateXY)
    })
  }

  ajustScrollWidth() {
    const {
      nodes: {
        scroll: scrollNode
      },
      stylers: {
        scroll: scrollStyler
      }
    } = this

    let totalWidth = 0

    toArray(scrollNode.children).forEach(child => {
      const childStyler = styler(child)
      const childWidth = childStyler.get(PROP_W)
      totalWidth += childWidth
      childStyler.set(PROP_W, childWidth)
    })

    scrollStyler.set(PROP_W, totalWidth)
    scrollNode.style.cssText += `;display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-direction:row;flex-direction:row;`
  }

  getDistance(point) {
    return getDistance(this.originalPoint, point)
  }

  getDirection(point) {
    return getDirection(this.originalPoint, point)
  }
}
