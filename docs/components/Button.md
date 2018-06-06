# Button 按钮

点击后会触发一个操作。

## API

### Props

属性     | 说明           | 类型                                                       | 默认值
---------|----------------|------------------------------------------------------------|-----------
type     | 按钮类型       | `default` &vert; `primary` &vert; `ghost` &vert; `warning` | `default`
size     | 按钮大小       | `lg` &vert; `sm`                                           | `lg`
icon     | 图标名称       | string                                                     | -
disabled | 是否禁用       | boolean                                                    | false
inline   | 是否为行内按钮 | boolean                                                    | false

### Events

事件  | 说明     | 参数
------|----------|------
click | 点击事件 | e
