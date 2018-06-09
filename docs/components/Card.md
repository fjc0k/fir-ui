# Card 卡片

用于组织信息和操作，通常也作为详细信息的入口。

## 规则

- 形状为矩形。
- 可包含多种类型的元素，比如：图片、文字、按钮等。

## 代码演示

- 一个卡片

    <f-card thumb="https://dn-placeholder.qbox.me/40x40/108ee9/fff" title="标题" extraTitle="标题辅助信息" note="备注" extraNote="备注辅助信息">内容</f-card>

    ```html
    <f-card
      thumb="https://dn-placeholder.qbox.me/40x40/108ee9/fff"
      title="标题"
      extraTitle="标题辅助信息"
      note="备注"
      extraNote="备注辅助信息">
      内容
    </f-card>
    ```

- 通栏卡片

    <f-card thumb="https://dn-placeholder.qbox.me/40x40/108ee9/fff" title="标题" note="备注" extraNote="备注辅助信息" full><f-icon name="ellipsis" slot="extraTitle" />内容</f-card>

    ```html
    <f-card
      thumb="https://dn-placeholder.qbox.me/40x40/108ee9/fff"
      title="标题"
      note="备注"
      extraNote="备注辅助信息"
      full>
      <f-icon name="ellipsis" slot="extraTitle" />
      内容
    </f-card>
    ```

## API

### Props

属性       | 说明         | 类型    | 默认值
-----------|--------------|---------|--------
thumb      | 标题图片地址 | string  | -
title      | 标题         | string  | -
extraTitle | 标题辅助信息 | string  | -
note       | 备注         | string  | -
extraNote  | 备注辅助信息 | string  | -
full       | 是否通栏     | boolean | false

### Slots

插槽       | 说明         | 参数
-----------|--------------|------
thumb      | 标题图片     | -
title      | 标题         | -
extraTitle | 标题辅助信息 | -
note       | 备注         | -
extraNote  | 备注辅助信息 | -
