module.exports = {
  extends: 'xo',

  parser: 'babel-eslint',

  env: {
    browser: true,
    node: true,
    jest: true,
    mocha: true
  },

  rules: {
    // 使用两个空格缩进
    indent: [2, 2, { SwitchCase: 1, MemberExpression: false }],

    // 字符串使用单引号，允许使用反勾号
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],

    // 行末无分号
    semi: [2, 'never'],

    // 花括号之间有空格
    'object-curly-spacing': [2, 'always'],

    // 允许: if (false) return
    curly: [2, 'multi-line'],

    // 允许: fn && fn()
    'no-unused-expressions': [2, { allowShortCircuit: true }],

    // 允许: 注释以小写字母打头
    'capitalized-comments': 0
  }
}
