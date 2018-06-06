<template>
  <f-container>
    <f-nav-bar mode="light">
      <div slot="left">
        <f-icon name="left" size="md" />
      </div>
      冬菜助手
      <div @click="drawer=!drawer" slot="right">
        <f-icon name="ellipsis" size="md" />
      </div>
    </f-nav-bar>

    <FDrawer apper="push" v-model="drawer" @show="$log('show')">
      <f-form title="表单" labelWidth="5em">
        <f-form-item label="姓名" desc="三字以内">
          min1
          <div slot="extra">￥</div>
        </f-form-item>
        <f-form-item label="姓名" desc="三字以内">
          min1
          <div slot="extra">￥</div>
        </f-form-item>
        <f-form-item label="姓名" desc="三字以内">
          min1
          <div slot="extra">￥</div>
        </f-form-item>
        <div slot="tip">请勾选注册协议</div>
      </f-form>
    </FDrawer>

    <f-form title="表单" labelWidth="5em">
      <f-form-item label="姓名" desc="三字以内">
        min1
        <div slot="extra">￥</div>
      </f-form-item>
      <div slot="tip">请勾选注册协议</div>
    </f-form>

    <f-icon name="loading" />

    <f-wing-blank>
      <f-button type="primary">
        注册
      </f-button>
    </f-wing-blank>

    <f-modal-operation v-model="slide4">
      <f-modal-button>标为未读</f-modal-button>
      <f-modal-button>置顶聊天</f-modal-button>
      <f-modal-button>删除 Ta</f-modal-button>
    </f-modal-operation>

    <f-flex wrap="wrap">
      <f-flex-item basis="15%" v-for="i in 20" :key="i">{{ i }}</f-flex-item>
    </f-flex>

    <f-divider>
      <f-icon name="voice" /> 我是有底线的
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
    drawer: false,
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
