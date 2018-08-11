const webpack = require('webpack');
const path = require('path');
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');


// 读取要自动插入root节点的 html 和 css
var loading = {
    html: fs.readFileSync(path.join(__dirname, './src/components/loadingTest/index.html')),
    css: '<style>' + fs.readFileSync(path.join(__dirname, './src/components/loadingTest/index.css')) + '</style>'
}


module.exports = {
    devtool: 'source-map',

    entry: {
        'verdor': ['react', 'react-dom', 'react-router-dom'],
        'index': [
            'babel-polyfill',
            'react-hot-loader/patch',
            path.join(config.srcPath, 'index.js')
        ]
    },

    output: {
        path: config.distPath,
        filename: '[name].bundle.js',
        publicPath: "/"
    },

    resolve: {
        alias: {
            '@': config.srcPath
        }
    },

    devServer: {
        contentBase: config.srcPath,
        port: config.port,
        historyApiFallback: true,
        inline: true,
        hot: true,
        proxy: {
            '/api/v1': {
                target: 'http://deadpool-dev.xxx.com',
                secure: false,
                changeOrigin: true
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff)?$/,
                loader: 'url-loader'

            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            favicon: path.resolve(config.srcPath, 'favicon.ico'),
            inject: 'body',
            template: path.join(config.srcPath, 'index.tmpl.html'),
            loading
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.ProvidePlugin({
            lodash: 'lodash'
        })
    ]
};
