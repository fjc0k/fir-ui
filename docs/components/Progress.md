# Progress 进度条

表明某个任务的当前进度。

## 代码演示

- 吸顶式进度条

    **见网页顶部~**
    <f-progress :percent="20" />

    ```html
    <f-progress :percent="20" />
    ```

- 嵌入式进度条

    <f-progress :percent="20" :fixed="false" />

    ```html
    <f-progress :percent="20" :fixed="false" />
    ```

- 隐藏未填充的轨道

    <f-progress :percent="20" :fixed="false" :unfilled="false" />

    ```html
    <f-progress :percent="20" :fixed="false" :unfilled="false" />
    ```

## API

### Props

属性     | 说明                 | 类型    | 默认值
---------|----------------------|---------|--------
percent  | 进度百分比           | number  | 0
fixed    | 是否吸顶 | boolean | true
unfilled | 是否显示未填充的轨道 | boolean | true
