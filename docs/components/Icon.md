# Icon 图标

语义化的矢量图形。

## 代码演示

- 使用 `name` 指定图标名称

    <f-icon name="voice" />

    ```html
    <f-icon name="voice" />
    ```

- 使用 `size` 指定图标大小

    <f-icon name="voice" size="lg" />

    ```html
    <f-icon name="voice" size="lg" />
    ```

## 图标列表

点击图标复制代码。

<f-grid cols="5">
  <f-grid-item v-for="icon in icons" :key="icon.id" :style="getStyle(icon)">
  <f-icon :name="icon.id" style="width:25%;height:25%;" slot="icon" />
  </f-grid-item>
</f-grid>

## API

### Props

属性 | 说明     | 类型                                                                   | 默认值
-----|----------|------------------------------------------------------------------------|-----------
name | 图标名称 | string                                                                 | -
size | 图标大小 | `default`（继承父元素的大小） &vert; `xxs` &vert; `xs` &vert; `sm` &vert; `md` &vert; `lg` | `default`

<script>
import icons from 'ant-design-icons/dist/mobile/anticons.json'

export default {
  data: () => ({ icons }),
  methods: {
    getStyle(icon) {
      return {
        cursor: 'pointer',
        background: ['dislike', 'fail', 'success'].indexOf(icon.id) >= 0 ? 'gray' : null
      }
    }
  }
}
</script>
