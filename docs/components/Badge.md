# Badge 徽标数

组件右上角的红点、数字或者文字。用于告知用户，该区域的状态变化或者待处理任务的数量。

## 规则

- 当用户只需知道大致有内容更新时，应该使用红点型，如：社交中的群消息通知。
- 当用户有必要知晓每条更新时，应该使用数字型。如：社交中的一对一的消息通知。

## 代码演示

- 独立使用

    <f-badge text="鲁班七号" /> vs
    <f-badge text="马可波罗" hot />

    ```html
    <f-badge text="鲁班七号" /> vs
    <f-badge text="马可波罗" hot />
    ```

- 附着于其他组件

    <f-badge dot style="margin-right:20px;"><f-icon name="voice" /></f-badge>
    <f-badge :text="102"><f-icon name="info-circle" size="lg" /></f-badge>

    ```html
    <f-badge dot>
      <f-icon name="voice" />
    </f-badge>
    <f-badge :text="102">
      <f-icon name="info-circle" size="lg" />
    </f-badge>
    ```

- 置于角落

    <f-list><f-list-item>hello<f-badge :text="102" corner slot="extra"></f-badge></f-list-item></f-list>

    ```html
    <f-badge :text="102">
      <f-icon name="info-circle" size="lg" />
    </f-badge>
    ```

## API

### Props

属性          | 说明                                                                                      | 类型                 | 默认值
--------------|-------------------------------------------------------------------------------------------|----------------------|--------
text          | 展示的数字或文案，当为数字时候，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | string &vert; number | -
overflowCount | 展示封顶的数字值                                                                          | number               | 99
dot           | 不展示文字，只有一个小红点                                                                 | boolean              | false
hot           | 营销样式                                                                                  | boolean              | false
corner        | 置于角落                                                                                  | boolean              | false

