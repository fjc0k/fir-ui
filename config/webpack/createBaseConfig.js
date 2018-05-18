const path = require('path')
const Config = require('webpack-chain')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = path.resolve.bind(path, __dirname, '../../')
const outDir = resolve('dist')

module.exports = ({ isProd }) => {
  const config = new Config()

  config
    .mode(isProd ? 'production' : 'development')
    .entry('fir-ui')
      .add(resolve(isProd ? 'src/index.js' : 'playground/index.js'))
      .end()
    .output
      .path(outDir)
      .filename('[name].js')

  if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  config.module
    .rule('svg')
      .test(/\.svg$/)
      .use('svg-to-symbol-loader')
        .loader('svg-to-symbol-loader')
        .options({
          extractId({ name }) {
            return name.replace(/^ios-/, '')
          }
        })

  config.module
    .rule('html')
      .test(/\.html$/)
      .use('html-loader')
        .loader('html-loader')
        .options({
          minimize: true,
          conservativeCollapse: false
        })

  config.module
    .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: false
          }
        })

  config.module
    .rule('js')
      .test(/\.js$/)
      .exclude.add(/node_modules/).end()
      .use('babel-loader')
        .loader('babel-loader')
        .options({
          presets: ['@babel/env'],
          plugins: [
            'transform-vue-jsx',
            '@babel/transform-runtime',
            ['import', {
              libraryName: 'lodash',
              libraryDirectory: '',
              camel2DashComponentName: false
            }, 'lodash'],
            ['import', {
              libraryName: 'ionicons',
              customName: name => {
                name = /^(ios|md|logo)-/.test(name) ? name : `ios-${name}`
                return `ionicons/dist/ionicons/svg/${name}.svg`
              }
            }, 'ionicons']
          ]
        })

  const stylusRule = config.module.rule('stylus').test(/\.(styl|css)$/)
  if (isProd) {
    stylusRule.use('extract-css-loader').loader(MiniCssExtractPlugin.loader)
  } else {
    stylusRule.use('vue-style-loader').loader('vue-style-loader')
  }
  stylusRule.use('css-loader').loader('css-loader').options({
    modules: true,
    localIdentName: `[local]_[hash:base64:8]`,
    importLoaders: 1,
    sourceMap: !isProd
  })
  stylusRule.use('postcss-loader').loader('postcss-loader').options({
    plugins: [require('autoprefixer')({
      browsers: [
        'iOS >= 7',
        'Android >= 4'
      ]
    })],
    sourceMap: !isProd
  })
  stylusRule.use('stylus-loader').loader('stylus-loader').options({
    preferPathResolver: 'webpack'
  })

  config.plugin('vue-loader').use(VueLoaderPlugin)

  if (isProd) {
    config.plugin('clean').use(CleanWebpackPlugin, [
      [outDir],
      {
        root: resolve('.')
      }
    ])
    config.plugin('extract-css').use(MiniCssExtractPlugin, [{
      filename: 'fir-ui.css'
    }])
  }

  return config
}
