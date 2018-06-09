# Stepper 步进器

用作增加或者减少当前数值。

## 规则

- 当想要对数值进行小幅度调整时使用，例如：将购买数量从 1 调整到 5。

## 代码演示

- 步进器

    <f-stepper :value="1" />

    ```html
    <f-stepper :value="1" />
    ```

- 禁止从输入框输入

    <f-stepper :value="1" readonly />

    ```html
    <f-stepper :value="1" readonly />
    ```

- 禁用状态

    <f-stepper :value="1" disabled />

    ```html
    <f-stepper :value="1" disabled />
    ```

## API

### Props

属性     | 说明                               | 类型    | 默认值
---------|------------------------------------|---------|--------------------------
value    | 当前数值，可使用 `v-model` 双向绑定 | number  | -
min      | 最小值                             | number  | Number.NEGATIVE_INFINITY
max      | 最大值                             | number  | Number.POSITIVE_INFINITY
step     | 步进值                             | number  | 1
readonly | 是否禁止从输入框输入               | boolean | false
disabled | 是否禁用                           | boolean | false

