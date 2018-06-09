# NavBar 导航栏

位于 app 内容区的上方，系统状态栏的下方，并且提供在一系列页面中的导航能力。

## 规则

- 可在导航栏中显示当前视图的标题。如果标题非常冗长且无法精简，可以空缺。
- 可在导航栏中使用 [SegmentedControl](/components/SegmentedControl.html) 对内容进行层级划分。
- 避免用过多的元素填满导航栏。一般情况下，一个『返回按钮』、一个『标题』、一个『当前视图的控件』就足够了；如果已经有了 [SegmentedControl](/components/SegmentedControl.html) ，一般只搭配一个『返回按钮』或者『当前视图的控件』。
- 为图标和文字控件，提供更大的点击热区。

## 代码演示

- 不同风格

  - dark

      <f-nav-bar><f-icon name="left" size="md" slot="left" />标题<f-icon name="search" size="md" slot="right" /></f-nav-bar>

      ```html
      <f-nav-bar>
        <f-icon name="left" size="md" slot="left" />
        标题
        <f-icon name="search" size="md" slot="right" />
      </f-nav-bar>
      ```
  
  - light

      <f-nav-bar mode="light"><f-icon name="left" size="md" slot="left" />标题<f-icon name="search" size="md" slot="right" /></f-nav-bar>

      ```html
      <f-nav-bar mode="light">
        <f-icon name="left" size="md" slot="left" />
        标题
        <f-icon name="search" size="md" slot="right" />
      </f-nav-bar>
      ```

- 配合 [SegmentedControl](/components/SegmentedControl.html) 使用

  - dark

      <f-nav-bar><f-icon name="left" size="md" slot="left" /><f-segmented-control :data="['动态', '附近']" color="white" /><f-icon name="search" size="md" slot="right" /></f-nav-bar>

      ```html
      <f-nav-bar>
        <f-icon name="left" size="md" slot="left" />
        <f-segmented-control :data="['动态', '附近']" color="white" />
        <f-icon name="search" size="md" slot="right" />
      </f-nav-bar>
      ```
  
  - light

      <f-nav-bar mode="light"><f-icon name="left" size="md" slot="left" /><f-segmented-control :data="['动态', '附近']" /><f-icon name="search" size="md" slot="right" /></f-nav-bar>

      ```html
      <f-nav-bar mode="light">
        <f-icon name="left" size="md" slot="left" />
        <f-segmented-control :data="['动态', '附近']" />
        <f-icon name="search" size="md" slot="right" />
      </f-nav-bar>
      ```

## API

### Props

属性 | 说明 | 类型                  | 默认值
-----|------|-----------------------|--------
mode | 模式 | `dark` &vert; `light` | dark

### Slots

插槽  | 说明     | 参数
------|----------|------
left  | 左侧内容 | -
right | 右侧内容 | -
