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

    <br />
    <f-carousel loop style="height:200px" :indicator="false" autoplay>
      <div style="height:200px;line-height:200px;text-align:center;background:#ffc069">
        1
      </div>
      <div style="height:200px;line-height:200px;text-align:center;background:#cf1322">
        2
      </div>
      <div style="height:200px;line-height:200px;text-align:center;background:#7cb305">
        3
      </div>
      <div v-if="slide4" style="height:200px;line-height:200px;text-align:center;background:blue">
        4
      </div>
    </f-carousel>
    <br />

    <f-button @click.native="slide4=true">add</f-button>

    <FPagination current="0" total="10" mode="default">

    </FPagination>

    <f-list header="滚动列表">
      <f-scroll style="height:150px">
        <f-list-item @click.native="log" v-for="n in 10" :key="n">
          {{ n }}
        </f-list-item>
        <!-- <div slot="top">松开立即刷新</div> -->
        <div slot="bottom">上拉加载更多</div>
      </f-scroll>
    </f-list>

    <br />

    <f-scroll direction="horizontal">
      <f-card v-for="n in 10" :key="n">
        {{ n }}
      </f-card>
    </f-scroll>

    <f-list header="表单" footer="备注">
      <f-list-item  arrow="horizontal">
        <f-icon name="sound" slot="thumb" />
        如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,
        <f-list-item-brief>
          hello
        </f-list-item-brief>
      </f-list-item>
      <FSwipeAction>
        <f-list-item error disabled  arrow="horizontal">
          <f-icon name="sound" slot="thumb" />
          如果是属性发生变化,则返回attributes.如果是一个CharacterData节点发生变化,
          <div slot="extra">
            亚拉锁
          </div>
        </f-list-item>
        <div slot="right">
          <FSwipeActionButton type="cancel">取消</FSwipeActionButton>
          <FSwipeActionButton>删除</FSwipeActionButton>
          <FSwipeActionButton type="primary">取关</FSwipeActionButton>
        </div>
      </FSwipeAction>
    </f-list>

    <f-divider>
      <f-icon name="sound" /> 我是有底线的
    </f-divider>

    <!-- <f-action-sheet :maskClosable="true" maskThrough title="分享到" message="选择渠道" :showCancel="true" :data="actions" :visible="true" /> -->

  </f-container>
</template>

<script>
export default {
  methods: {
    log() {
      console.log('log')
    }
  },
  data: () => ({
    slide4: false,
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
