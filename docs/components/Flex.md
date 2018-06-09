# Flex 弹性布局

对 CSS flex 布局的封装。

## 代码演示

- 默认布局

    <f-flex><div v-for="i in 5" :key="i">{{ i }}</div></f-flex>

    ```html
    <f-flex>
      <div v-for="i in 5" :key="i">
        {{ i }}
      </div>
    </f-flex>
    ```

- 纵向布局

    <f-flex direction="column"><div v-for="i in 5" :key="i">{{ i }}</div></f-flex>

    ```html
    <f-flex direction="column">
      <div v-for="i in 5" :key="i">
        {{ i }}
      </div>
    </f-flex>
    ```

## API

### Props

属性           | 说明                       | 类型                                                                                                         | 默认值
---------------|----------------------------|--------------------------------------------------------------------------------------------------------------|------------
direction      | 子元素的排列方向           | `row` &vert; `row-reverse` &vert; `column` &vert; `column-reverse`                                           | row
wrap           | 子元素的换行方式           | `nowrap` &vert; `wrap` &vert; `wrap-reverse`                                                                 | nowrap
justifyContent | 子元素在主轴上的对齐方式   | `flex-start` &vert; `flex-end` &vert; `center` &vert; `space-between` &vert; `space-around`                  | flex-start
alignItems     | 子元素在交叉轴上的对齐方式 | `stretch` &vert; `flex-start` &vert; `flex-end` &vert; `center` &vert; `baseline`                            | stretch
alignContent   | 有多根轴线时的对齐方式     | `stretch` &vert; `flex-start` &vert; `flex-end` &vert; `center` &vert; `space-between` &vert; `space-around` | stretch
inline         | 是否为行内布局             | boolean                                                                                                      | false
## FlexItem

### 代码演示

- 默认布局

    <f-flex><f-flex-item v-for="i in 5" :key="i">{{ i }}</f-flex-item></f-flex>

    ```html
    <f-flex>
      <f-flex-item v-for="i in 5" :key="i">
        {{ i }}
      </f-flex-item>
    </f-flex>
    ```

### API

#### Props

属性      | 说明                         | 类型                                                                                            | 默认值
----------|------------------------------|-------------------------------------------------------------------------------------------------|--------
alignSelf | 项目本身在交叉轴上的对齐方式 | `auto` &vert; `flex-start` &vert; `flex-end` &vert; `center` &vert; `baseline` &vert; `stretch` | auto
order     | 项目的排列顺序               | number                                                                                          | 0
grow      | 项目的放大比例               | number                                                                                          | 1
shrink    | 项目的缩小比例               | number                                                                                          | 1
basis     | 项目的伸缩基准值             | string                                                                                          | auto
