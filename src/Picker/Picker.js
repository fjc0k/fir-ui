import { isNumber } from 'lodash'
import { chain, action, spring, transform } from 'popmotion'
import { Scroll } from '../_utils/scroll'

export default class Picker extends Scroll {
  constructor(nodes, {
    index = 0,
    ...scrollOptions
  } = {}) {
    super(nodes, {
      ...scrollOptions,
      index,
      bindToWrapper: true,
      scrollEndAlways: true
    })
  }

  beforeStart() {
    const {
      options: { CWH, index },
      nodes: { scroll: scrollNode }
    } = this

    this.itemHeight = scrollNode.firstChild[CWH]

    if (isNumber(index)) {
      this.wheelTo(index, { duration: 0 })
    }
  }

  scrollEnd() {
    return new Promise(resolve => {
      const {
        itemHeight,
        scroll: {
          translateXY,
          maxXY,
          minXY
        }
      } = this

      const currentXY = translateXY.get()

      const velocity = translateXY.getVelocity()

      chain(
        spring({
          from: currentXY,
          to: (
            transform.pipe(
              transform.snap(itemHeight),
              transform.clamp(minXY, maxXY)
            )(
              currentXY + (0.2 * velocity)
            )
          ),
          damping: 20, // 阻尼系数: 值越大振动越不明显
          stiffness: 66, // 弹性系数: 单位形变所产生弹力的大小
          mass: 0.5, // 质量参数
          restDelta: itemHeight, // 低于这个值时直接完成动画
          restSpeed: true
        }),
        action(() => {
          this.listener(
            'wheelEnd',
            Math.abs(translateXY.get() / itemHeight),
            true
          )
          resolve()
        })
      ).start(translateXY)
    })
  }

  wheelTo(index, tweenOptions) {
    return new Promise(resolve => {
      const nextXY = this.itemHeight * index
      this.scrollTo(-nextXY, tweenOptions).then(() => {
        this.listener(
          'wheelEnd',
          index,
          false
        )
        resolve()
      })
    })
  }
}
