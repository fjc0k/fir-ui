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
    <f-wing-blank>
      <f-button icon="ellipsis"  type="ghost">
        按钮
      </f-button>
    </f-wing-blank>

    <br />

    <f-notice-bar :icon="null" mode="closable">
      明天会更好。
    </f-notice-bar>
    <br />

    <f-notice-bar mode="link">
      明天会更好。争做文明人！明天会更好。争做文明人！
    </f-notice-bar>

    <br />

    <f-notice-bar>
      明天会更好。争做文明人！明天会更好。争做文明人！
      <div slot="action">
        去瞅瞅
      </div>
    </f-notice-bar>
    <br />

    <f-card
      title="明天会更好"
      note="2015年"
      extraNote="1点30分">
      <f-marquee speed="10">
        {{ card }}
      </f-marquee>
    </f-card>

    <br />

    <f-progress percent="50" :unfilled="false" />

    <!-- <f-popup position="bottom" :visible="true">
      <div>dhhfk</div>
    </f-popup> -->

    <br />

    <f-steps :data="steps" v-model="step" />

    <br />

    <fSegmentedControl v-model="day" :data="days"></fSegmentedControl>

    <f-white-space></f-white-space>

    <f-textarea v-model="text" autoHeight />

    {{ text }}
    <br />

    <f-search-bar v-model="q" placeholder="哈哈哈" />

    <br />

    <f-badge text="hello" />  <f-badge text="热" hot />  <f-badge text="热" dot />

    <f-badge :text="1" hot>
      <f-button inline>按钮</f-button>
    </f-badge>

    <f-badge text="促" corner>
      <f-button inline>按钮</f-button>
    </f-badge>
    <br />

    <f-stepper v-model="num" :max="20" />

    <br />

    <f-switch v-model="xswitch" color="red" />

    <hr />

    <f-image-picker v-model="files" cols="5" />

    <br />

    <!-- <f-toast type="loading" :visible="true" duration="0">
      加载中...
    </f-toast> -->

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
