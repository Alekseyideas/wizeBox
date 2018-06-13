const MinifyPlugin = require("babel-minify-webpack-plugin");
module.exports = {
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 versions", "safari >= 7"]
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MinifyPlugin()
    ]
};