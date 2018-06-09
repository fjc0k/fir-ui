# Drawer 抽屉

用于在屏幕边缘显示应用导航等内容的面板。

## 规则

- 是 Android 推荐的导航方式，常见于该平台应用。

## 代码演示

<p /><f-button inline @click="push=false,visible=true">打开抽屉</f-button><p />

<f-button inline @click="push=true,visible=true">打开抽屉（并推开主内容）</f-button>

<f-drawer :push="push" width="300px" v-model="visible"><f-wing-blank><f-white-space /><f-button @click="visible=false">关闭</f-button></f-wing-blank><f-divider>点击遮罩亦可关闭</f-divider></f-drawer>

<script>
  export default {
    data: () => ({
      visible: false,
      push: false
    })
  }
</script>

```html
<f-button inline @click="push=false,visible=true">打开抽屉</f-button>

<f-button inline @click="push=true,visible=true">打开抽屉（推开主内容）</f-button>

<f-drawer :push="push" width="300px" v-model="visible">
  <f-wing-blank>
    <f-white-space />
    <f-button @click="visible=false">关闭</f-button>
  </f-wing-blank>
  <f-divider>点击遮罩亦可关闭</f-divider>
</f-drawer>

<script>
  export default {
    data: () => ({
      visible: false,
      push: false
    })
  }
</script>
```

## API

### Props

属性            | 说明                                 | 类型                  | 默认值
----------------|--------------------------------------|-----------------------|--------
visible         | 是否显示抽屉，可用 `v-model` 双向绑定 | boolean               | false
position        | 抽屉位置                             | `left` &vert; `right` | left
width           | 抽屉宽度                             | string                | 70%
backgroundColor | 抽屉背景颜色                         | string                | -
push            | 打开抽屉时，推开主内容                | boolean               | false
maskClosable    | 点击遮罩关闭抽屉                     | boolean               | true
maskTransparent | 遮罩是否透明                         | boolean               | false
maskThrough     | 可点击穿透遮罩                       | boolean               | false
