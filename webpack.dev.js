const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './public',
        hot: true,
        host: '0.0.0.0'
    },
    devtool: 'inline-source-map',
})