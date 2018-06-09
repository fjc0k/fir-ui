# WingBlank 两翼留白

留白以衬托和凸显视觉主体。

## 代码演示

- before

    <f-button type="primary">确认</f-button>

    ```html
    <f-button type="primary">确认</f-button>
    ```

- after

    <f-wing-blank><f-button type="primary">确认</f-button></f-wing-blank>
    
    ```html
    <f-wing-blank>
      <f-button type="primary">确认</f-button>
    </f-wing-blank>
    ```

## API

### Props

属性 | 说明           | 类型                                                 | 默认值
-----|----------------|------------------------------------------------------|--------
size | 两翼留白的间距 | `sm` &vert; `md` &vert; `lg` | lg
