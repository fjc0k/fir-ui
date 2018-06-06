# Fir UI

`fir-ui` 是 [Ant Design](http://ant.design/) 的移动规范的 Vue 实现，在开发过程中参考了 [Ant Design Mobile of React](https://github.com/ant-design/ant-design-mobile/)。

## 特性

- 完善的组件库，友好的 API 设计，可覆盖各类场景
- 基于 Stylus + CSS Modules 的样式设计，可轻松进行主题配置
- 支持 `组件按需加载`

## 安装

```bash
# yarn
yarn add fir-ui

# npm
npm install fir-ui --save
```

## 使用

```js
import Vue from 'vue'
import { Button } from 'fir-ui'

new Vue({
  el: '#app',
  render: h => h(Button, 'Start')
})
```

## 浏览器支持

- `iOS`
- `Android 4.0+`
