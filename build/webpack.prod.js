// webpack.prod.js 打包代码的配置
const webpack = require('webpack')
const path = require('path')
const webpackCommonConf = require('./webpack.common.js')
const { smart } = require('webpack-merge')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
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
                test: /\.scss$/,            // 可以匹配：  /\.css$/
                loader: [
                    MiniCssExtractPlugin.loader,  // 注意，这里不再用 style-loader
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'        //打包后生成前缀，在common中加入的话无效，因为此处是二次转换
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),           //清理 dist 目录
        new webpack.DefinePlugin({
            // 注意：此处 webpack.dev.js 中写 'development' ，webpack.prod.js 中写 'production'
            ENV: JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:6].css'
            // chunkFilename: "css/[name].[hash:6].css",
        })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]   //压缩css
    },
    devtool: 'source-map'
})
