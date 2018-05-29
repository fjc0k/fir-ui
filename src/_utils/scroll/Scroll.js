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

  options = {}

  listeners = []

  scrollCSSText = null

  constructor({
    container,
    scroll,
    ...nodes
  } = {}, {
    direction = DIRECTION_VERTICAL_TEXT,
    bindToWrapper = false,
    on = {},
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
      on,
      ...options,
      isVertical,
      XY,
      WH
    }
  }

  updateOptions(options = {}) {
    this.options = {
      ...this.options,
      ...options,
      on: {
        ...this.options.on,
        ...options.on
      }
    }
  }

  hook(name, ...args) {
    if (this[name]) {
      return this[name](...args)
    }
    return Promise.resolve()
  }

  listener(name, ...args) {
    if (this.options.on[name]) {
      this.options.on[name](...args)
    }
  }

  init() {
    this.hook('beforeInit')

    const {
      options: {
        isVertical,
        XY,
        WH
      },
      nodes: {
        scroll: scrollNode
      },
      stylers: {
        container: containerStyler,
        scroll: scrollStyler
      }
    } = this

    this.listeners.forEach(listener => listener.stop())
    this.listeners = []

    if (!isVertical) {
      if (this.scrollCSSText !== null) {
        scrollNode.style.cssText = this.scrollCSSText
      }
      this.ajustScrollWidth()
    }

    this.scroll = {
      ...this.scroll,
      minXY: containerStyler.get(WH) - scrollStyler.get(WH),
      maxXY: 0,
      translateXY: value(0, scrollStyler.set(XY))
    }

    this.hook('afterInit')
  }

  start(options) {
    options && this.updateOptions(options)

    this.init()

    this.hook('beforeStart')

    const {
      nodes: {
        scroll: scrollNode
      },
      options: {
        isVertical,
        XY,
        bindToWrapper
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
      this.hook('scrollStart', e, getPointXY(e))
    }))

    this.listeners.push(listen(bindToWrapper ? scrollNode : document, 'touchmove').start(e => {
      if (!isValid) return
      const direction = this.getDirection(getPointXY(e))
      // eslint-disable-next-line
      if (!(
        (!isVertical && (direction & DIRECTION_HORIZONTAL)) ||
        (isVertical && (direction & DIRECTION_VERTICAL))
      )) {
        isValid = false
        translateXY.stop()
      } else {
        this.hook('scrollMove', e, getPointXY(e))
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
      this.hook('scrollEnd', e, getPointXY(e)).then(() => {
        scrolling = false
        translateXY.stop()
        this.listener('scrollEnd', this)
      })
    }))

    this.listener('ready', this)
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
    if (this.scrollCSSText === null) {
      this.scrollCSSText = scrollNode.style.cssText
    }
    scrollNode.style.cssText = this.scrollCSSText + `;display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-moz-box-orient:horizontal;-moz-box-direction:normal;-ms-flex-direction:row;flex-direction:row;`
  }

  getDistance(point) {
    return getDistance(this.originalPoint, point)
  }

  getDirection(point) {
    return getDirection(this.originalPoint, point)
  }
}
