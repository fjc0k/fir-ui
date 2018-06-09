# Container 容器

`Fir UI` 的全部组件（除 `Container` 自身外） `都只能` 在 `Container` 组件内正常使用。

## 代码演示

- ✖️ 错误

    ```html
    <template>
      <f-button>确认</f-button>
    </template>
    ```

- ✔️ 正确

    ```html
    <template>
      <f-container>
        <f-button>确认</f-button>
      </f-container>
    </template>
    ```

## API

### Props

属性   | 说明       | 类型   | 默认值
-------|------------|--------|--------
styles | 自定义主题 | object | -
