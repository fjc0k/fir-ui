# SegmentedControl 分段器

由至少 2 个分段控件组成，用作不同视图的显示；是 iOS 的推荐组件。

## 规则

- 和 [Tabs](/components/Tabs.html) 功能相似，尽可能避免一个页面中同时出现这两个组件。
- 可以搭配 [NavBar](/components/NavBar.html) 一起使用，用于显示多个视图，分段数一般为 2 个。
- 单独放置一行时，分段数最多为 5 个；文案需要精简，一般 2-4 个字。
- 尽可能保持文案长度一致。

## 代码演示

- 默认选中第一个条目

    <f-segmented-control :data="['射手','刺客', '战士', '法师']" />

    ```html
    <f-segmented-control
      :data="['射手','刺客', '战士', '法师']"
    />
    ```

- 用 `value` 给定初始选中条目的值

    <f-segmented-control :data="['射手','刺客', '战士', '法师']" value="法师" />

    ```html
    <f-segmented-control
      :data="['射手','刺客', '战士', '法师']"
      value="法师"
    />
    ```

- 用 `v-model` 同步选中选中条目的值 <f-badge :text="heroType" />

    <f-segmented-control :data="['射手','刺客', '战士', '法师']" v-model="heroType" />

    ```html
    <f-badge :text="heroType" />
    <f-segmented-control
      :data="['射手','刺客', '战士', '法师']"
      v-model="heroType"
    />

    <script>
      export default {
        data: () => ({
          heroType: '刺客'
        })
      }
    </script>
    ```

- 获取选中条目的详细信息 <f-badge :text="heroTypeEN" />

    {{ heroTypeDetail }}

    <f-segmented-control :data="heroTypes" :detail.sync="heroTypeDetail" v-model="heroTypeEN" />

    ```html
    <f-badge :text="heroTypeEN" />
    {{ heroTypeDetail }}
    <f-segmented-control :data="heroTypes" :detail.sync="heroTypeDetail" v-model="heroTypeEN" />

    <script>
      export default {
        data: () => ({
          heroTypes: [
            ['射手', 'shooter'],
            ['刺客', 'assassin'],
            ['战士', 'warrior'],
            ['法师', 'mage']
          ],
          heroTypeEN: 'warrior',
          heroTypeDetail: {}
        })
      }
    </script>
    ```

- 换种风格

    <f-segmented-control :data="['射手','刺客', '战士', '法师']" color="#1AAD19" />

    ```html
    <f-segmented-control
      :data="['射手','刺客', '战士', '法师']"
      color="#1AAD19"
    />
    ```

- 禁用状态

    <f-segmented-control :data="['射手','刺客', '战士', '法师']" disabled />

    ```html
    <f-segmented-control
      :data="['射手','刺客', '战士', '法师']"
      disabled
    />
    ```

<script>
  export default {
    data: () => ({
      heroTypes: [
        ['射手', 'shooter'],
        ['刺客', 'assassin'],
        ['战士', 'warrior'],
        ['法师', 'mage']
      ],
      heroType: '刺客',
      heroTypeEN: 'warrior',
      heroTypeDetail: {}
    })
  }
</script>

## API

### Props

属性     | 说明                                                | 类型                                      | 默认值
---------|-----------------------------------------------------|-------------------------------------------|--------
data     | 选项数据                                            | 见 [data 数据规范](/guide/dataSpec.html)  | []
value    | 选定条目的 `value` 属性值，可使用 `v-model` 双向绑定 | any                                       | `第一个条目的值`
detail   | 配合 `.sync` 使用，以同步选定条目的详细信息          | { label: any, value: any, ...restProps  } | -
color    | 主色调                                              | string                                    | -
disabled | 是否禁用                                            | boolean                                   | false

