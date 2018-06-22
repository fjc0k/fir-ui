import { chain, decay, action, spring } from 'popmotion'
import { Scroll as BaseScroll } from '../_utils/scroll'

export default class Scroll extends BaseScroll {
  constructor(nodes, scrollOptions = {}) {
    super(nodes, scrollOptions)
  }

  scrollEnd() {
    return new Promise(resolve => {
      const {
        scroll: {
          translateXY,
          maxXY,
          minXY
        }
      } = this

      chain(
        decay({
          from: translateXY.get(),
          velocity: translateXY.getVelocity(),
          power: 0.2
        }).while(nextXY => {
          if (nextXY > maxXY + 20 || nextXY < minXY - 20) {
            return false
          }
          return true
        }),
        action(({ complete }) => {
          const currentXY = translateXY.get()
          if (currentXY >= minXY && currentXY <= maxXY) return complete()
          chain(
            spring({
              from: currentXY,
              to: currentXY > maxXY ? maxXY : minXY,
              damping: 20
            }),
            action(complete)
          ).start(translateXY)
        }),
        action(resolve)
      ).start(translateXY)
    })
  }
}
