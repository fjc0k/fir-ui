module.exports = {
  title: 'Fir UI',
  description: 'fir-ui 是 Ant Design 的移动规范的 Vue 实现，在开发过程中参考了 Ant Design Mobile of React。',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '开发指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: '小工具', link: '/tools/' }
    ],
    sidebar: {
      '/guide/': [
        '',
        'dataSpec'
      ],
      '/components/': [
        '',
        '_Layout',
          'Flex',
          'WingBlank',
          'WhiteSpace',
        '_Navigation',
          'NavBar',
          'Pagination',
          'SegmentedControl',
          'Drawer',
        '_DataEntry',
          'Button',
          'ImagePicker',
          'Switch',
          'Stepper',
        '_DataDisplay',
          'Icon',
          'NoticeBar',
          'Badge',
          'Card',
        '_Feedback',
          'ActionSheet',
          'ActivityIndicator',
          'Progress',
        '_Other',
          'Container',
          'Divider',
          'Marquee'
      ]
    },
    repo: 'fjc0k/fir-ui',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新'
  },
  chainWebpack(config) {
    config.module
      .rule('js')
        .exclude.add(/fir\-ui/)
  }
}
