# ActionSheet 动作面板

从底部弹出的模态框，提供和当前场景相关的 2 个以上的操作动作，也支持提供标题和描述。

## 规则

- 提供清晰的退出按钮。
- 可高亮破坏性操作，例如：将『删除』处理成红色文本。
- 不要放置过多内容，避免面板纵向滚动。

## 代码演示

<p /><f-button @click="title=null,message=null,visible=true">打开动作面板</f-button><p />
<f-button @click="title='选择操作',message=null,visible=true">打开动作面板（带标题）</f-button><p />
<f-button @click="title=null,message='请谨慎操作~',visible=true">打开动作面板（带描述）</f-button><p />
<f-button @click="title='选择操作',message='请谨慎操作~',visible=true">打开动作面板（带标题和描述）</f-button>
<f-action-sheet v-model="visible" :title="title" :message="message" :data="data" />

```html
<f-button @click="title=null,message=null,visible=true">打开动作面板</f-button>
<f-button @click="title='选择操作',message=null,visible=true">打开动作面板（带标题）</f-button>
<f-button @click="title=null,message='请谨慎操作~',visible=true">打开动作面板（带描述）</f-button>
<f-button @click="title='选择操作',message='请谨慎操作~',visible=true">打开动作面板（带标题和描述）</f-button>

<f-action-sheet
  v-model="visible"
  :title="title"
  :message="message"
  :data="data"
/>

<script>
  export default {
    data: () => ({
      visible: false,
      title: null,
      message: null,
      data: [
        {
          label: '留言(点击 3 秒后关闭操作面板)',
          value: '留言',
          onClick: (item, index) => new Promise(resole => {
            setTimeout(resole, 3000)
          })
        },
        { label: '删除', value: '删除', danger: true },
        { label: '举报', value: '举报', color: 'green' }
      ]
    })
  }
</script>
```

<script>
  export default {
    data: () => ({
      visible: false,
      title: null,
      message: null,
      data: [
        {
          label: '留言(点击 3 秒后关闭操作面板)',
          value: '留言',
          onClick: (item, index) => new Promise(resole => {
            setTimeout(resole, 3000)
          })
        },
        { label: '删除', value: '删除', danger: true },
        { label: '举报', value: '举报', color: 'green' }
      ]
    })
  }
</script>

## API

### Props

属性            | 说明                             | 类型                                     | 默认值
----------------|----------------------------------|------------------------------------------|--------
visible         | 是否可见，可用 `v-model` 双向绑定 | boolean                                  | false
title           | 标题                             | string                                   | -
message         | 描述                             | string                                   | -
data            | 选项数据                         | 见 [data 数据规范](/guide/dataSpec.html)，自有属性：{ danger: '是否危险操作', color: '文字颜色', onClick: '点击回调函数，参数：`(item, index)`，若要异步关闭，请返回一个 Promise' } | []
showCancel      | 是否显示取消按钮                 | boolean                                  | true
cancelText      | 取消按钮文案                     | string                                   | 取消
maskClosable    | 是否可点击遮罩关闭                 | boolean                                  | true
maskTransparent | 是否令遮罩透明                     | boolean                                  | false
maskThrough     | 是否可点击穿透遮罩                   | boolean                                  | false

### Slots

插槽       | 说明         | 作用域参数
-----------|--------------|-----------------------------------------------------
title      | 标题         | -
message    | 描述         | -
default    | 选项         | { item: '选项信息', index: '选项在 data 中的索引' }
cancelText | 取消按钮文案 | -
