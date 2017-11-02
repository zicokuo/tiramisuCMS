'use strict';

/* eslint-disable no-undef */
var resolve = require('path').resolve;
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var url = require('url');
var publicPath = '/assets/';
var itemName = 'dist';
var devPath = '/dev/';

module.exports = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return {
        entry: {
            vendor: './src/vendor',
            index: './src/main.js'
        },
        output: {
            path: resolve(__dirname, itemName),
            filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
            chunkFilename: '[id].js?[chunkhash]',
            publicPath: options.dev ? devPath : publicPath
        },
        module: {
            rules: [{
                test: /\.vue$/,
                use: ['vue-loader']
            }, {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }, {
                test: /\.(scss|sass)$/,
                use: ['sass-loader']
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)$/,
                use: [
                // {
                //   loader: 'url-loader',
                //   options: {limit: 8129},
                // },
                {
                    loader: 'file-loader',
                    options: { name: '[name]_[hash:6].[ext]', outputPath: 'images/' }
                }]
            }, {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: { name: '[name]_[hash:8].[ext]', outputPath: 'fonts/' }
                }]
            }]
        },
        plugins: [new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] }), new HtmlWebpackPlugin({ template: 'src/index.html' }), new ExtractTextPlugin('styles.css')],
        resolve: {
            alias: {
                '~': resolve(__dirname, './src'),
                'src': resolve(__dirname, './src'),
                'public': resolve(__dirname, './src/public-resource'),
                'images': resolve(__dirname, './src/public-resource/images'),
                'modules': resolve(__dirname, './src/public-resource/modules'),
                'iconfont': resolve(__dirname, './src/public-resource/iconfont'),
                //  别名vue,用作动态解释模板
                'vue': 'vue/dist/vue.js'
            }
        },

        devServer: {
            host: '127.0.0.1',
            port: 8010,
            proxy: {
                '/api/': {
                    target: 'http://127.0.0.1:8080',
                    changeOrigin: true, pathRewrite: { '^/api': '' }
                },
                '/server/': {
                    target: 'http://tiramisu.localhost.com',
                    changeOrigin: true, pathRewrite: { '^/server': '' }
                }
            },

            historyApiFallback: {
                index: url.parse(options.dev ? devPath : publicPath).pathname
            }
        },

        devtool: options.dev ? '#eval-source-map' : '#source-map'
    };
};
//# sourceMappingURL=webpack.config.js.map