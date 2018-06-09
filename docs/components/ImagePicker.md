# ImagePicker 图片选择器

只是图片选择器，一般用于上传图片前的文件选择操作，但不包括图片上传的功能。

## 代码演示

- 一行 5 张图片

    <f-image-picker :cols="5" v-model="files" />

    ```html
    <f-image-picker
      :cols="5"
      v-model="files"
    />
    ```

- 限制图片数量

    <f-image-picker :cols="5" :disabled="files.length >= 6" v-model="files" />

    ```html
    <f-image-picker
      :cols="5"
      :disabled="files.length >= 6"
      v-model="files"
    />
    ```

- 只能添加 gif 动图

    <f-image-picker :cols="5" accept="image/gif" v-model="files" />

    ```html
    <f-image-picker
      :cols="5"
      accept="image/gif"
      v-model="files"
    />
    ```

### 以上演示中 `files` 变量的初始值

```js
[
  { url: 'http://shp.qpic.cn/ishow/2735092819/1475063192_1644740874_23023_sProdImgNo_2.jpg/0' },
  { url: 'http://shp.qpic.cn/ishow/2735013018/1517309036_84828260_13443_sProdImgNo_2.jpg/0' },
  { url: 'http://shp.qpic.cn/ishow/2735092910/1475117583_1644740874_31626_sProdImgNo_2.jpg/0' },
  { url: 'http://shp.qpic.cn/ishow/2735052214/1526969845_-888937974_9476_sProdImgNo_2.jpg/0' },
  { url: 'http://shp.qpic.cn/ishow/2735051710/1494986511_1644740874_8382_sProdImgNo_2.jpg/0' },
  { url: 'http://shp.qpic.cn/ishow/2735021411/1518580538_84828260_31403_sProdImgNo_2.jpg/0' }
]
```

<script>
  export default {
    data: () => ({
      files: [
        { url: 'http://shp.qpic.cn/ishow/2735092819/1475063192_1644740874_23023_sProdImgNo_2.jpg/0' },
        { url: 'http://shp.qpic.cn/ishow/2735013018/1517309036_84828260_13443_sProdImgNo_2.jpg/0' },
        { url: 'http://shp.qpic.cn/ishow/2735092910/1475117583_1644740874_31626_sProdImgNo_2.jpg/0' },
        { url: 'http://shp.qpic.cn/ishow/2735052214/1526969845_-888937974_9476_sProdImgNo_2.jpg/0' },
        { url: 'http://shp.qpic.cn/ishow/2735051710/1494986511_1644740874_8382_sProdImgNo_2.jpg/0' },
        { url: 'http://shp.qpic.cn/ishow/2735021411/1518580538_84828260_31403_sProdImgNo_2.jpg/0' }
      ]
    })
  }
</script>

## API

### Props

属性     | 说明                                   | 类型                                                           | 默认值
---------|----------------------------------------|----------------------------------------------------------------|---------
files    | 图片文件数组，可使用 `v-model` 双向绑定 | [ { url: '图片地址', orientation: '图片旋转角度', ... }, ... ] | []
cols     | 列数，即一行显示多少图片                | number                                                         | 4
accept   | 允许选择的图片的 MIME 类型，多个可用 `,` 隔开                               | string                                                         | image/gif,image/jpeg,image/jpg,image/png
disabled | 是否禁止添加图片                       | boolean                                                        | false
multiple | 是否支持多选                           | boolean                                                        | false

### Events

事件        | 说明                 | 参数
------------|----------------------|-----------------------------------------------------------------------------
add         | 添加图片后触发       | { url: '图片地址', orientation: '图片旋转角度', file: '图片文件' }
remove      | 删除图片后触发       | ({ url: '图片地址', orientation: '图片旋转角度', file: '图片文件' }, index)
change      | 添加或删除图片后触发 | (newFiles, oldFiles)
image-click | 点击图片时触发       | ({ url: '图片地址', orientation: '图片旋转角度', file: '图片文件' }, index)
fail        | 添加图片失败时触发   | (file, index)
