import { styler, chain, delay, tween, action, easing } from 'popmotion'

export default class Marquee {
  constructor(wrapperNode, marqueeNode, { speed = 30, delay = 1.5 } = {}) {
    this.wrapperNode = wrapperNode
    this.marqueeNode = marqueeNode
    this.marqueeStyler = styler(marqueeNode)
    this.options = { speed, delay }
  }

  start() {
    this.stop()
    const { wrapperNode, marqueeNode } = this
    this.wrapperWidth = wrapperNode.clientWidth / 2
    this.marqueeWidth = marqueeNode.offsetWidth
    if (this.marqueeWidth > this.wrapperWidth) {
      this.run()
    }
  }

  run() {
    const {
      marqueeStyler,
      wrapperWidth,
      marqueeWidth,
      options: {
        speed,
        delay: delayS
      }
    } = this

    const from = 0
    const to = -(marqueeWidth - wrapperWidth + 5 - from)
    const duration = (Math.abs(to) / speed) * 1000
    const ease = easing.linear
    const delayMS = delayS * 1000

    this.action = chain(
      tween({ from, to, duration, ease }),
      delay(delayMS),
      action(({ update, complete }) => complete(update(0))),
      delay(delayMS)
    ).start({
      update: marqueeStyler.set('x'),
      complete: () => {
        this.run(marqueeWidth, wrapperWidth)
      }
    })
  }

  stop() {
    const { action, marqueeStyler } = this
    action && action.stop()
    marqueeStyler.set('x', 0)
  }
}
