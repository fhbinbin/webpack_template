// webpack.prod.js 打包代码的配置
const webpack = require('webpack')
const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = smart(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'bundle.[contentHash:8].js',  // 打包代码时，加上 hash 戳
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: "../"
                    }
                  },
                  "css-loader",
                  "postcss-loader",
                  "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:6].css'
        })
    ],
    devtool: 'source-map'
})
