const path = require('path')
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/App.jsx',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.jsx$/,
                include: [path.join(__dirname, 'src')],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new htmlPlugin({template: './src/template.html'})
    ],
    resolve: {
        extensions: ['.js', '.jsx'] 
    }
}