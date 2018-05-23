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

  </f-container>
</template>

<script>
export default {
  data: () => ({
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
