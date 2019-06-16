// module.exports = {
//     plugins: [require('autoprefixer')]
// }

  module.exports = {
    plugins: [
        require('autoprefixer')({//必须设置支持的浏览器才会自动添加添加浏览器兼容
            "overrideBrowserslist": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
};
