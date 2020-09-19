const path = require('path')
// const webpack = require('webpack');
// let env = process.env.NODE_ENV == "development" ? "development" : "production";
// const config = {
//   mode: env,
//  devServer: {
//      hot:true
//  }
// }
//   plugins: [
//      new webpack.HotModuleReplacementPlugin(), //热加载插件
//   ],
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(), //热加载插件
  // ],
  publicPath: './',
  devServer: {
    proxy: {
        '/api': {
            target: 'http://api.xchtzon.top:8088',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    },
    // publicPath, // 和 publicPath 保持一致
    // disableHostCheck: process.env.NODE_ENV === 'development' // 关闭 host check，方便使用 ngrok 之类的内网转发工具
},
  chainWebpack: config => {
    config.resolve.alias
      .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  },
}