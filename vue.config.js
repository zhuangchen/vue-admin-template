// vue.config.js
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: [
        'src/main.ts',
      ],
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '后台管理系统',
    },
  },
  publicPath: isTravisCI() ? '/vue-admin-template/' : '/',
  lintOnSave: true,
  assetsDir: 'static',
  runtimeCompiler: true,
  filenameHashing: false,
  // 生产环境不打包source map, 加速构建
  productionSourceMap: false,
  // 配置 webpack-dev-server 行为
  devServer: {
    // 端口
    port: 8087,
    // 启动时自动默认浏览器打开
    open: true,
    overlay: {
      // 显示warnings
      warnings: true,
      // 显示error
      errors: true
    },
    // 代理配置
    proxy: {
      "/": {
        target: "https://reqres.in/", // 代理到本地后台开发
        changeOrigin: true,
        secure: false,
      }
    }
  },
  chainWebpack: config => {
    // 分析
    // config.when(process.env.use_analyzer === 'true', config =>
    //   config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // )
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Or array of paths
          resources: ['./src/style/variables/_font-size.scss']
        })
        .end()
    })
  }
}