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
      '/components/': [
        '',
        'Button',
        'Icon'
      ]
    },
    repo: 'fjc0k/fir-ui',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页'
  }
}
