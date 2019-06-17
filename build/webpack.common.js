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
    resolve: {
        extensions: ['.js', '.json', '.scss'],
        alias: {
            '@': srcPath,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'  //postcss在common配上的话会在开发环境也输出css前缀
                ]
                // loader: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']  // 增加 'less-loader' ，注意顺序, 可以简写为['style', 'css', 'sass'] 
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 2, // 8k以下的base64内联，不产生图片文件
                        fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
                        name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
                        outputPath: 'images/', // 输出路径
                        publicPath: ''  // 可访问到图片的引用路径(相对/绝对)
                        // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
                        // publicPath: 'http://cdn.abc.com'
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}