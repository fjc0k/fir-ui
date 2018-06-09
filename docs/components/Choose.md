# Choose 选择

支持单选、多选、同意。

## 代码演示

- 根据 `selected` 的值自动判断单选、多选、同意（**注意：以下演示中使用 `v-model` 代替 `selected` 以支持双向绑定**）

  - 单选（若 `selected` 的值不是数组也不是布尔类型）

      <f-choose v-model="radioValue" value="鲁班七号">&nbsp;鲁班七号</f-choose><p />
      <f-choose v-model="radioValue" value="马可波罗">&nbsp;马可波罗</f-choose>

      ```html
      <f-choose v-model="radioValue" value="鲁班七号">鲁班七号</f-choose>
      <f-choose v-model="radioValue" value="马可波罗">马可波罗</f-choose>

      <script>
        export default {
          data: () => ({
            radioValue: '鲁班七号'
          })
        }
      </script>
      ```

  - 多选（若 `selected` 的值是数组）

      <f-choose v-model="checkboxValue" value="鲁班七号">&nbsp;鲁班七号</f-choose><p />
      <f-choose v-model="checkboxValue" value="马可波罗">&nbsp;马可波罗</f-choose>

      ```html
      <f-choose v-model="checkboxValue" value="鲁班七号">鲁班七号</f-choose>
      <f-choose v-model="checkboxValue" value="马可波罗">马可波罗</f-choose>

      <script>
        export default {
          data: () => ({
            checkboxValue: ['鲁班七号']
          })
        }
      </script>
      ```

  - 同意（若 `selected` 的值是布尔类型）

      <f-choose v-model="agree">&nbsp;同意用户协议</f-choose>

      ```html
      <f-choose v-model="agree">同意用户协议</f-choose>

      <script>
        export default {
          data: () => ({
            agree: true
          })
        }
      </script>
      ```

- 特殊需求下可指定单选

  - 若不指定单选，会被判断为同意

      <f-choose v-model="allowed" :value="true">&nbsp;允许</f-choose><p />
      <f-choose v-model="allowed" :value="false">&nbsp;禁止</f-choose>

      ```html
      <f-choose v-model="allowed" :value="true">允许</f-choose>
      <f-choose v-model="allowed" :value="false">禁止</f-choose>

      <script>
        export default {
          data: () => ({
            allowed: true
          })
        }
      </script>
      ```
  
  - 指定单选后，满足预期

      <f-choose v-model="allowed" :value="true" type="radio">&nbsp;允许</f-choose><p />
      <f-choose v-model="allowed" :value="false" type="radio">&nbsp;禁止</f-choose>

      ```html
      <f-choose v-model="allowed" :value="true" type="radio">允许</f-choose>
      <f-choose v-model="allowed" :value="false" type="radio">禁止</f-choose>

      <script>
        export default {
          data: () => ({
            allowed: true
          })
        }
      </script>
      ```

<script>
export default {
  data: () => ({
    radioValue: '鲁班七号',
    checkboxValue: ['鲁班七号'],
    agree: true,
    allowed: true
  })
}
</script>

## API

### Props

属性     | 说明                             | 类型                                                                                                       | 默认值
---------|----------------------------------|------------------------------------------------------------------------------------------------------------|--------
selected | 选中值，可使用 `v-model` 双向绑定 | any                                                                                                        | -
value    | 当前值                           | any                                                                                                        | -
type     | 选择器类型                       | `auto` (根据 `selected` 的值自动判断) &vert; `radio` (单选) &vert; `checkbox` (多选) &vert; `agree` (同意) | auto
disabled | 是否禁用                         | boolean                                                                                                    | false
