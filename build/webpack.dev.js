// webpack.dev.js 运行代码的配置（该文件暂时用不到，先创建了，下文会用到）
const webpack = require('webpack')
const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
module.exports = smart(webpackCommonConf, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('development')
        })
    ],
    devServer: {
        port: 3000,
        progress: true,  // 显示打包的进度条
        contentBase: distPath,  // 根目录
        open: true,  // 自动打开浏览器
        compress: true,  // 启动 gzip 压缩
        proxy: {
            // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
            '/api': 'http://localhost:3000',

            // 将本地 /api2/xxx 代理到 localhost:3000/xxx
            '/api2': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '/api2': ''
                }
            }
        }
    }
})
