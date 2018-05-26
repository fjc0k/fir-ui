<template>
  <f-container>
    <f-nav-bar mode="light">
      <div slot="left">
        <f-icon name="left" />
      </div>
      冬菜助手
      <div slot="right">
        <f-icon name="ellipsis" />
      </div>
    </f-nav-bar>

    <f-notice-bar mode="closable">
      最近网站升级，可能出现卡顿，敬请理解。<f-icon name="frown-o" />
    </f-notice-bar>

    <!-- <f-Carousel class="my-carousel">
      <div class="v-item" style="height: 300px;line-height:300px">carousel 1</div>
      <div class="v-item" style="height: 300px;line-height:300px">carousel 2</div>
      <div class="v-item" style="height: 300px;line-height:300px">carousel 3</div>
    </f-Carousel> -->

    <f-list header="表单" footer="备注">
      <f-list-item  arrow="horizontal">
        <f-icon name="sound" slot="thumb" />
        如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,
        <f-list-item-brief>
          hello
        </f-list-item-brief>
      </f-list-item>
      <f-list-item error disabled  arrow="horizontal">
        <f-icon name="sound" slot="thumb" />
        如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,
        <div slot="extra">
          亚拉锁
          <f-list-item-brief>
            hello
          </f-list-item-brief>
        </div>
      </f-list-item>
    </f-list>

    <f-divider>
      <f-icon name="sound" /> 我是有底线的
    </f-divider>

    <!-- <f-action-sheet :maskClosable="true" maskThrough title="分享到" message="选择渠道" :showCancel="true" :data="actions" :visible="true" /> -->

  </f-container>
</template>

<script>
export default {
  data: () => ({
    actions: ['微信', 'QQ', ['微博', 'wb', {
      danger: true,
      onClick() {
        return new Promise(resolve => {
          setTimeout(resolve, 5000)
        })
      }
    }]],
    step: '第一步',
    steps: ['第一步', '第二步', '第三步'],
    card: '如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,则返回characterData,如果是目标节点的某个子节点发生了变化,则返回childList.',
    num: 10,
    q: '',
    xswitch: true,
    files: [{
      url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
    }, {
      url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
    }, {
      url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
    }, {
      url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
    }, {
      url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
    }, {
      url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
    }],
    days: ['1今天', '明天', '后天'],
    day: '明天',
    text: `fffkg

    fff



    ff`
  })
}
</script>
