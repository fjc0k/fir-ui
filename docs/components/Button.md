# Button 按钮

点击后会触发一个操作。

## 代码演示

- 普通按钮

    <f-button>确认</f-button>

    ```html
    <f-button>确认</f-button>
    ```

- 主要按钮

    <f-button type="primary">确认</f-button>

    ```html
    <f-button type="primary">确认</f-button>
    ```

- 小型按钮

    <f-button size="sm">确认</f-button>

    ```html
    <f-button size="sm">确认</f-button>
    ```

- 小型行内警告按钮

    <f-button type="warning" size="sm" inline>确认</f-button>

    ```html
    <f-button type="warning" size="sm" inline>确认</f-button>
    ```

- 包含图标的幽灵按钮

    <f-button type="ghost" icon="check-circle-o">确认</f-button>

    ```html
    <f-button type="ghost" icon="check-circle-o">确认</f-button>
    ```

- 被禁用的按钮

    <f-button disabled>确认</f-button>

    ```html
    <f-button disabled>确认</f-button>
    ```

## API

### Props

属性     | 说明           | 类型                                                       | 默认值
---------|----------------|------------------------------------------------------------|-----------
type     | 按钮类型       | `default` &vert; `primary` &vert; `ghost` &vert; `warning` | default
size     | 按钮大小       | `lg` &vert; `sm`                                           | lg
icon     | 图标名称       | string                                                     | -
disabled | 是否禁用       | boolean                                                    | false
inline   | 是否为行内按钮 | boolean                                                    | false

### Events

事件  | 说明     | 参数
------|----------|------
click | 点击事件 | e: Event
