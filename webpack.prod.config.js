//生产打包完文件有一个报错：React is running in production mode, but dead code elimination has not been applied.
//此问题发生在 React16.x版本，别的版本试了不报错

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        filename: '[name].[hash:8].js',
        publicPath: "/"
    },

    resolve: {
        alias: {
            '@': config.srcPath
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }

                    ]
                })
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
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].[hash:8].css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'verdor',
            minChunks: 2
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ProvidePlugin({
            lodash: 'lodash'
        })
    ]
};
