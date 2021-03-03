module.exports = {
  publicPath: "/jd",
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'assets': '@/assets',
        'views': '@/views',
        'utils': '@/utils'
      }
    }
  }
}