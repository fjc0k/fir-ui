# Divider 分割线

区隔内容的分割线。

## 代码演示

- 分割线

    <f-divider />

    ```html
    <f-divider />
    ```

- 通栏分割线

    <f-divider full />

    ```html
    <f-divider full />
    ```

- 包含文字提示的分割线

    <f-divider>人家是有底线的</f-divider>

    ```html
    <f-divider>人家是有底线的</f-divider>
    ```

- 文字提示偏左的通栏分割线

    <f-divider align="left" full>英雄介绍</f-divider>

    ```html
    <f-divider align="left" full>英雄介绍</f-divider>
    ```

- 虚线分割线

    <f-divider type="dashed"><f-icon name="question-circle" /></f-divider>
    <f-divider type="dotted"><f-icon name="down" /></f-divider>

    ```html
    <f-divider type="dashed">
      <f-icon name="question-circle" />
    </f-divider>
    <f-divider type="dotted">
      <f-icon name="down" />
    </f-divider>
    ```

## API

### Props

属性  | 说明     | 类型                                    | 默认值
------|----------|-----------------------------------------|----------
type  | 分割线类型 | `solid` &vert; `dashed` &vert; `dotted` | solid
align | 文字对齐方向 | `center` &vert; `left`  &vert; `right`  | center
full  | 是否通栏，即 `100%` 宽度 | boolean                                 | false
