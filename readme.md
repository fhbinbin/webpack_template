开发环境需要添加此项代码执行："dev": "webpack --config build/webpack.dev.js",

如果当前项目是webpack3.x版本，使用extract-text-webpack-plugin；
如果当前项目是webpack4.x版本（但已有extract-text-webpack-plugin配置），可以继续用extract-text-webpack-plugin，但必须用对应的beta版本，且这个beta版本不支持生成hash；
如果当前项目是webpack4.x版本且是新项目，使用mini-css-extract-plugin。
