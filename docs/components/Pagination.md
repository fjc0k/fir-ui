# Pagination 分页器

分隔长列表，每次只加载一个页面。

## 规则

- 当加载/渲染所有数据将花费很多时间或者流量时使用

## 代码演示

- 默认形态的分页器

    <f-pagination :index="1" :total="20" />

    ```html
    <f-pagination :index="1" :total="20" />
    ```

- 其他形态的分页器

    - button

        <f-pagination mode="button" :index="1" :total="20" />

        ```html
        <f-pagination mode="button" :index="1" :total="20" />
        ```

    - number

        <f-pagination mode="number" :index="1" :total="20" />

        ```html
        <f-pagination mode="number" :index="1" :total="20" />
        ```

    - pointer

        <f-pagination mode="pointer" :index="1" :total="20" />

        ```html
        <f-pagination mode="pointer" :index="1" :total="20" />
        ```

- 自定义翻页文本

    <f-pagination :index="1" :total="20" prevText="< 上一页"><template slot="nextText">下一页<f-icon name="right"/></template></f-pagination>

    ```html
    <f-pagination :index="1" :total="20" prevText="< 上一页">
      <template slot="nextText">
        下一页
        <f-icon name="right" />
      </template>
    </f-pagination>
    ```

- 自定义分页指示器

    <f-pagination :index="1" :total="20"><template slot-scope="{ index }"><f-divider>{{ index }}</f-divider></template></f-pagination>

    ```html
    <f-pagination :index="1" :total="20">
      <template slot-scope="{ index }">
        <f-divider>{{ index }}</f-divider>
      </template>
    </f-pagination>
    ```

- 禁用分页器

    <f-pagination :index="1" :total="20" disabled />

    ```html
    <f-pagination :index="1" :total="20" disabled />
    ```

- 双向绑定 <f-badge :text="page" />

    <f-pagination v-model="page" :total="20" />
    <script>
      export default {
        data: () => ({ page: 5 })
      }
    </script>

    ```html
    <f-badge :text="page" />
    <f-pagination v-model="page" :total="20" />

    <script>
      export default {
        data: () => ({ page: 5 })
      }
    </script>
    ```

## API

### Props
属性     | 说明                             | 类型                                                       | 默认值
---------|----------------------------------|------------------------------------------------------------|-----------
mode     | 分页器形态                             | `default` &vert; `button` &vert; `number` &vert; `pointer` | default
index    | 当前页号，可用 `v-model` 双向绑定 | number                                                     | 1
total    | 数据总数                         | number                                                     | 0
prevText | 上一页文本                       | string                                                     | 上一页
nextText | 下一页文本                       | string                                                     | 下一页
disabled | 是否禁用                         | boolean                                                    | false

### Slots

插槽     | 说明       | 参数
---------|------------|----------------------------
default  | 指示器     | { index, total, disabled }
prevText | 上一页文本 | -
nextText | 下一页文本 | -
