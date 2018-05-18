<template>
  <div>
    <f-nav-bar icon="left" right="cc">冬菜助手Pro</f-nav-bar>
    <f-notice-bar mode="closable">
      打开 http://iconfont.cn/ 搜索 team，找到想要的图标，大家可以参考官方的使用方法生成想要的图标.
    </f-notice-bar>
    <f-white-space />
    <f-progress :percent="percent" :unfilled="true" position="normal" />
    <f-white-space />
    <f-button type="primary" @click="pickerModel=['今天'].slice()">
      确认 <f-icon name="close" />
    </f-button>
    <f-white-space />

    <f-wing-blank>
      {{ sliderValue }}
      <f-slider step="20" v-model="sliderValue" />
    </f-wing-blank>


    <f-white-space />
    <f-picker-view
      v-model="pickerModel"
      :data="pickerData"
      divider=":"
      cascade
    />
    <f-white-space />
    <f-list header="列表">
      <f-list-item desc="fjfkgkgnkdm" extra="23" note="哈哈哈" arrow="right" infoWidth="4em">
      </f-list-item>
      <f-list-item icon="check" note="23" desc="浏览量：20">
        年龄
      </f-list-item>
      <f-form-item label="姓名" note="元">
        <f-input placeholder="输入姓名" align="right" />
      </f-form-item>
      <f-form-item label="姓名" note="元">
        <f-textarea placeholder="输入姓名" rows="1" autoHeight />
      </f-form-item>
      <f-form-item label="性别">
        <f-switch disabled />
      </f-form-item>
      <f-form-item label="性别">
        <f-stepper value="12" readonly />
      </f-form-item>
    </f-list>
    <f-white-space />
    <f-segmented-control v-model="selectedValue" :data="data" tintColor="#1aad19" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sliderValue: 40,
      percent: 0,
      x: 1,
      data: [
        { label: '今天', value: 'today' },
        { label: '明天', value: 'tommorow' }
      ],
      pickerData: [
        {
          label: '方剑剑kdddddddddddddddddddddddddd',
          value: 'ff',
          children: [
            '哈哈哈',
            ['fff', , [
              '66',
              ['55', , [
                '88',
                '00'
              ]]
            ]],
            'dfkfk',
            'ffkg'
          ]
        },
        {
          label: '方剑剑2',
          value: 'ff2',
          children: [
            '哈哈哈2',
            'fff',
            'dfkfk'
          ]
        }
      ],
      pickerModel: [],
      selectedValue: 'today'
    }
  }
}
</script>

<style>
  [data-component-flex-item] {
    background: #ddd;
  }

</style>
