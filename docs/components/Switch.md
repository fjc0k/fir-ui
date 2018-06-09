# Switch 滑动开关

在两个互斥对象进行选择，比如：选择开或关。

## 规则

- 只在 Form 中使用。
- 避免增加额外的文案来描述当前 Switch 的值。

## 代码演示

- 打开状态

    <f-form><f-form-item label="白马非马"><f-switch on slot="extra" /></f-form-item></f-form>

    ```html
    <f-form>
      <f-form-item label="白马非马">
        <f-switch on slot="extra" />
      </f-form-item>
    </f-form>
    ```

- 换个色调

    <f-form><f-form-item label="白马非马"><f-switch on color="red" slot="extra" /></f-form-item></f-form>

    ```html
    <f-form>
      <f-form-item label="白马非马">
        <f-switch on color="red" slot="extra" />
      </f-form-item>
    </f-form>
    ```

- 禁用状态

    <f-form><f-form-item label="白马非马"><f-switch on disabled slot="extra" /></f-form-item></f-form>

    ```html
    <f-form>
      <f-form-item label="白马非马">
        <f-switch on disabled slot="extra" />
      </f-form-item>
    </f-form>
    ```

## API

### Props

属性     | 说明           | 类型                                                       | 默认值
---------|----------------|------------------------------------------------------------|-----------
on     | 是否打开状态，可使用 `v-model` 双向绑定       | boolean | false
color     | 主色调       | string                                           | -
disabled | 是否禁用状态       | boolean                                                    | false
