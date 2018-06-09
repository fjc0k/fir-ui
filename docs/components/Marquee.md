# Marquee 移动字幕

用来插入一段滚动的文字。

## 代码演示

- 子元素宽度未超过父元素宽度时，不会移动

    <f-marquee>今天的太阳，像瘫痪的卡车。</f-marquee>

    ```html
    <f-marquee>今天的太阳，像瘫痪的卡车。</f-marquee>
    ```

- 子元素宽度超过父元素宽度时，方会移动

    <f-marquee ref="marquee">今天的太阳，像瘫痪的卡车，沉重地运走整个下午，白醋、春梦、野柚子，把回忆揣进手掌的血管里，手电的光透过掌背，仿佛看见跌入云端的海豚。</f-marquee>

    <f-button size="sm" inline @click="() => $refs.marquee.start()">启动</f-button> |
    <f-button size="sm" inline @click="() => $refs.marquee.stop()">停止</f-button>

    ```html
    <f-marquee ref="marquee">今天的太阳，像瘫痪的卡车，沉重地运走整个下午，白醋、春梦、野柚子，把回忆揣进手掌的血管里，手电的光透过掌背，仿佛看见跌入云端的海豚。</f-marquee>

    <f-button size="sm" inline @click="() => $refs.marquee.start()">启动</f-button> |
    <f-button size="sm" inline @click="() => $refs.marquee.stop()">停止</f-button>
    ```

## API

### Props

属性     | 说明                 | 类型    | 默认值
---------|----------------------|---------|--------
speed  | 速度，每秒多少像素           | number  | 30
delay    | 延迟多少秒 | number | 1.5

### Methods

方法  | 说明         | 参数
------|--------------|------
start | 启动 | -
stop  | 停止 | -
