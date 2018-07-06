<template>
  <f-container>
    <f-nav-bar mode="light">
      <div slot="left">
        <f-icon name="left" size="md" />
      </div>
      <f-icon name="star" /> <f-badge :text="444" overflowStyle="ellipsis">冬菜助手</f-badge> <f-icon name="fab-font-awesome" /> <f-icon name="ion-md-finger-print" />
      <f-icon name="md-done-all" />
      <div @click="drawer=!drawer" slot="right">
        <f-icon name="ellipsis" size="md" />
      </div>
    </f-nav-bar>

    <f-white-space />
    <f-list title="标题" tip="hello" borderless>
      <f-list-item icon="voice">方剑成</f-list-item>
      <f-list-item label="hello" desc="今天">方剑成</f-list-item>
      <f-list-item label="hello">方剑成</f-list-item>
      <f-list-item label="hello" extra="明天" labeled>
        <f-input placeholder="hello"></f-input>
      </f-list-item>
      <f-list-item icon="voice" label="hello" desc="今天" extra="明天" linked>方剑成</f-list-item>
      <f-list-item label="hello" extra="明天" linked>方剑成</f-list-item>
    </f-list>
    <f-white-space />

    <f-sheet
      v-model="sheetVisible"
      title="确认订单信息"
      :confirmClosable="false"
      @confirm="done => window.setTimeout(done, 3000)">
      <f-preview plain>
        <f-preview-item label="订单状态">已完成</f-preview-item>
        <f-preview-item label="订单时间">2018-09-02</f-preview-item>
        <f-preview-item label="订单编号">20180902</f-preview-item>
        <f-preview-line />
        <f-preview-item label="快递公司">顺丰</f-preview-item>
        <f-preview-item label="快递单号">3455466779899434</f-preview-item>
      </f-preview>
    </f-sheet>

    <f-button @click="sheetVisible=true">open sheet</f-button>

    <f-white-space />

    <f-image
      src="http://yd.huichifangqiu.com//uploads/goodsimg/20180608/20dc04834f37891d9413ba368fdfada2.png"
      square
      circle
      alt="dd"
      title="fff"
    />

    <f-white-space />
    <f-preview plain>
      <f-preview-item label="订单状态">已完成</f-preview-item>
      <f-preview-item label="订单时间">2018-09-02</f-preview-item>
      <f-preview-item label="订单编号">20180902</f-preview-item>
      <f-preview-line />
      <f-preview-item label="快递公司">顺丰</f-preview-item>
      <f-preview-item label="快递单号">3455466779899434</f-preview-item>
    </f-preview>

    <f-white-space />

    <f-step current="1">
      <f-step-item title="同意协议" icon="voice" />
      <f-step-item title="注册" />
      <f-step-item title="激活" icon="voice" />
    </f-step>

    <f-white-space />

    <f-choose-group square direction="horizontal" v-model="cs" >
      <f-choose :value="cs1">
        男生
      </f-choose>

      <f-choose :value="cs2" block>
        女生
      </f-choose>

      <f-choose :value="cs3" block>
        双性人
      </f-choose>
    </f-choose-group>

    <f-white-space />

    <f-divider>
      <f-popover :placement="placement" :visible="popoverVisible">
        <f-button inline size="sm" @click="popoverVisible=!popoverVisible">按钮</f-button>
        <div slot="message" style="width:90px">
          电话：15974872223
        </div>
      </f-popover>
    </f-divider>

    {{ pickerDetail }}

    {{ pickerValue }}

    <FPickerView
      :caption="['开始年份', '结束年份']"
      visibleItemCount="5"
      :data="pickerData"
      :detail.sync="pickerDetail"
      v-model="pickerValue"
    ></FPickerView>

    <FCascadedPickerView
      :caption="['开始年份', '结束年份']"
      visibleItemCount="5"
      :data="pickerData2"
      :detail.sync="pickerDetail2"
      v-model="pickerValue2"
    ></FCascadedPickerView>

    <FTabBar selected="x">
      <FTabBarItem icon="voice">通知</FTabBarItem>
      <FTabBarItem icon="search">搜索</FTabBarItem>
      <FTabBarItem icon="cross" :badge="{
        dot: true
      }" value="x">我的</FTabBarItem>
    </FTabBar>

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
    window: window,
    sheetVisible: false,
    cs: 1,
    cs1: 1,
    cs2: 2,
    cs3: 3,
    pickerDetail: [],
    pickerData: [
      [2018, 2019],
      [2020, 2021, 2022, 2023, 2024, 2025]
    ],
    pickerValue: [2, 7],
    pickerDetail2: [],
    pickerData2: [
      [2016, 2016, { children: [
        1,
        2
      ] }],
      [2017, 2017, { children: [
        11,
        22
      ] }]
    ],
    pickerValue2: [2, 7],
    popoverVisible: false,
    placement: 'top',
    rate: 2,
    selectedRadio: 2,
    selectedCheckbox: [2],
    selectedAgree: false,
    detail: {},
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
