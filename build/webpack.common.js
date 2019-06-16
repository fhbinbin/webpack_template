const path = require('path')
const srcPath = path.join(__dirname, '..', 'src')
const distPath = path.join(__dirname, '..', 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(srcPath, 'index'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    //  MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                  ]
                // loader: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']  // 增加 'less-loader' ，注意顺序, 可以简写为['style', 'css', 'sass'] 
            }
        ]
    }
}