# WhiteSpace 上下留白

留白以衬托和凸显视觉主体。

## 代码演示

- before

    <f-button type="primary">确认</f-button>
    <f-button>取消</f-button>

    ```html
    <f-button type="primary">确认</f-button>
    <f-button>取消</f-button>
    ```

- after

    <f-button type="primary">确认</f-button>
    <f-white-space />
    <f-button>取消</f-button>

    ```html
    <f-button type="primary">确认</f-button>
    <f-white-space />
    <f-button>取消</f-button>
    ```

## API

### Props

属性 | 说明           | 类型                                                 | 默认值
-----|----------------|------------------------------------------------------|--------
size | 上下留白的间距 | `xs` &vert; `sm` &vert; `md` &vert; `lg` &vert; `xl` | md
