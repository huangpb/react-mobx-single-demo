const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');


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
                target: 'http://deadpool-dev.yeeuu.com',
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
            template: path.join(config.srcPath, 'index.tmpl.html')
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
