# NoticeBar 通告栏

在导航栏下方，一般用作系统提醒、活动提醒等通知。

## 代码演示

- 默认通告栏

    <f-notice-bar>一个提醒或通知。</f-notice-bar>

    ```html
    <f-notice-bar>一个提醒或通知。</f-notice-bar>
    ```

- 滚动通告栏

    <f-notice-bar>一个超长的提醒或通知：当通告内容宽度超过父元素宽度时，会自动滚动显示。</f-notice-bar>

    ```html
    <f-notice-bar>一个提醒或通知。</f-notice-bar>
    ```

- 自定义左侧图标

    <f-notice-bar icon="question-circle">一个提醒或通知。</f-notice-bar>

    ```html
    <f-notice-bar icon="question-circle">一个提醒或通知。</f-notice-bar>
    ```

- 自定义右侧操作文案

    <f-notice-bar v-model="visible">一个提醒或通知。<div style="color:gray;" slot="action" @click="visible=false">我知道了</div></f-notice-bar>
    <script>
      export default {
        data: () => ({
          visible: true
        })
      }
    </script>

    ```html
    <f-notice-bar v-model="visible">
      一个提醒或通知。
      <div style="color:gray;" slot="action" @click="visible=false">
        我知道了
      </div>
    </f-notice-bar>

    <script>
      export default {
        data: () => ({
          visible: true
        })
      }
    </script>
    ```

- 可关闭的通告栏

    <f-notice-bar mode="closable">一个提醒或通知。</f-notice-bar>

    ```html
    <f-notice-bar mode="closable">一个提醒或通知。</f-notice-bar>
    ```

- 可跳转链接的通告栏

    <f-notice-bar mode="link" url="https://github.com/fjc0k">一个提醒或通知。</f-notice-bar>

    ```html
    <f-notice-bar mode="link" url="https://github.com/fjc0k">一个提醒或通知。</f-notice-bar>
    ```

## API

### Props

属性    | 说明                                 | 类型                                      | 默认值
--------|--------------------------------------|-------------------------------------------|-----------
visible | 是否可见，可用 `v-model` 双向绑定     | boolean                                   | true
mode    | 提示类型                             | `default` &vert; `closable` &vert; `link` | default
icon    | 左侧图标                             | string                                    | voice
url     | 跳转 URL，仅当 `mode = 'link'` 时生效 | string                                    | -

### Slots

插槽   | 说明                                        | 参数
-------|---------------------------------------------|------
icon   | 左侧图标                                    | -
action | 右侧操作文案，仅当 `mode = 'default'` 时生效 | -
