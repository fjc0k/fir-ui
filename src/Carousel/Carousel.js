import { toArray, clamp } from 'lodash'
import { styler } from 'popmotion'
import { dom } from '../_utils'
import { Scroll } from '../_utils/scroll'
import { DIRECTION_LEFT } from '../_utils/scroll/consts'

export default class Carousel extends Scroll {
  pages = []

  totalPage = 0

  interval = null

  constructor(nodes, {
    index = 0,
    threshold = 0.1,
    loop = false,
    autoplay = false,
    interval = 3000,
    ...scrollOptions
  } = {}) {
    super(nodes, scrollOptions)

    this.currentIndex = index
    this.loop = loop
    this.threshold = threshold
    this.autoplay = autoplay
    this.autoplayInterval = interval
  }

  beforeInit() {
    const {
      loop,
      nodes: { scroll: scrollNode }
    } = this

    if (loop) {
      const children = scrollNode.children
      const childrenCount = children.length
      if (childrenCount > 1) {
        const first = children[0]
        const last = children[childrenCount - 1]
        if (first.dataset.cloned) {
          first.parentNode.replaceChild(
            dom.clone(children[childrenCount - 2], true),
            first
          )
          last.parentNode.replaceChild(
            dom.clone(children[1], true),
            last
          )
        } else {
          dom.prepend(scrollNode, dom.clone(last, true))
          dom.append(scrollNode, dom.clone(first, true))
        }
        this.currentIndex += 1
      } else {
        this.loop = false
      }
    }
  }

  afterInit() {
    const { options: { on } } = this

    if (on.initiated) {
      on.initiated()
    }
  }

  beforeStart() {
    const {
      currentIndex,
      autoplay,
      loop,
      nodes: { scroll: scrollNode },
      options: { WH }
    } = this

    this.pages = toArray(scrollNode.children).map(child => {
      const childStyler = styler(child)
      return {
        node: child,
        styler: childStyler,
        [WH]: childStyler.get(WH)
      }
    })

    this.totalPage = this.pages.length - (loop ? 2 : 0)

    this.slideTo(currentIndex, { duration: 0 })

    if (autoplay) {
      this.play()
    }
  }

  scrollStart() {
    if (this.autoplay) {
      this.stop()
    }
  }

  scrollEnd(e, point) {
    return new Promise(resolve => {
      const {
        threshold,
        currentIndex,
        pages,
        options: {
          WH
        },
        scroll: {
          translateXY
        }
      } = this

      let nextIndex = currentIndex

      const velocity = translateXY.getVelocity()

      if (velocity === 0) {
        const distance = this.getDistance(point)
        const direction = this.getDirection(point)
        if (direction & DIRECTION_LEFT) {
          nextIndex--
        } else {
          nextIndex++
        }
        nextIndex = clamp(nextIndex, 0, pages.length - 1)
        if (nextIndex !== currentIndex) {
          if (distance < pages[nextIndex][WH] * threshold) {
            nextIndex = currentIndex
          }
        }
      } else {
        if (velocity > 0) {
          nextIndex--
        } else {
          nextIndex++
        }
        nextIndex = clamp(nextIndex, 0, pages.length - 1)
      }

      this.slideTo(nextIndex).then(() => {
        if (this.autoplay) {
          this.play()
        }
        resolve()
      })
    })
  }

  play() {
    this.stop()
    if (this.loop) {
      this.interval = setInterval(() => {
        this.slideTo(this.currentIndex + 1)
      }, this.autoplayInterval)
    } else if (this.currentIndex < this.pages.length - 1) {
      this.interval = setInterval(() => {
        if (this.currentIndex + 1 === this.pages.length - 1) {
          this.stop()
        }
        this.slideTo(this.currentIndex + 1)
      }, this.autoplayInterval)
    }
  }

  stop() {
    clearInterval(this.interval)
  }

  slideTo(pageIndex, tweenOptions) {
    return new Promise(resolve => {
      const {
        loop,
        pages,
        options: {
          WH,
          on
        }
      } = this

      pageIndex = clamp(pageIndex, 0, pages.length - 1)
      this.currentIndex = pageIndex
      const nextXY = pages.slice(0, pageIndex).reduce((nextXY, page) => {
        nextXY += page[WH]
        return nextXY
      }, 0)
      this.scrollTo(-nextXY, tweenOptions).then(() => {
        const nextIndex = pageIndex
        if (loop) {
          if (nextIndex === 0) {
            dom.nextTick(() => {
              this.slideTo(pages.length - 2, { duration: 0 })
            })
            pageIndex = pages.length - 3
          } else if (nextIndex === pages.length - 1) {
            dom.nextTick(() => {
              this.slideTo(1, { duration: 0 })
            })
            pageIndex = 0
          } else {
            pageIndex -= 1
          }
        }
        if (!(tweenOptions && tweenOptions.duration === 0)) {
          on.slideEnd && on.slideEnd(pageIndex)
        }
        resolve()
      })
    })
  }
}
