/* eslint-disable no-undef */
const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const url = require('url')
// const publicPath = '/interface/assets/'
const publicPath = '/'
const itemName = 'dist'

module.exports = (options = {}) => {
    return {
        entry: {
            vendor: './src/vendor',
            index: './src/main.js'
        },
        output: {
            path: resolve(__dirname, itemName),
            filename: 'js/[name]-[hash].js?[hash]',
            chunkFilename: 'js/chunk[id]-[hash].js?[hash]',
            publicPath: publicPath,
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: ['vue-loader']
                },
                {
                    test: /\.js$/,
                    use: [{
                        loader: 'babel-loader',
                        //  es7 加载
                        options: {
                            presets: [['es2015', {modules: false}]],
                            plugins: ['syntax-dynamic-import']
                        },
                    }],
                    exclude: /node_modules/
                },
                {
                    test: /\.(css)$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                },
                {
                    test: /\.(scss|sass)$/,
                    use: ['sass-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|svgz)$/,
                    use: [
                        // {
                        //   loader: 'url-loader',
                        //   options: {limit: 8129},
                        // },
                        {
                            loader: 'file-loader',
                            options: {name: '[name]_[hash:6].[ext]', outputPath: '.' + publicPath + 'images/'}
                        }]
                }
                , {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {name: '[name]_[hash:8].[ext]', outputPath: '.' + publicPath + 'fonts/'}
                    }]
                },
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
            new HtmlWebpackPlugin({template: 'src/index.html'}),
            new ExtractTextPlugin('styles.css'),
        ],
        resolve: {
            alias: {
                '~': resolve(__dirname, './src'),
                'src': resolve(__dirname, './src'),
                //  别名vue,用作动态解释模板
                // 'vue': 'vue/dist/vue.min.js',
                'vue': 'vue/dist/vue.js',
            }
        }
        ,
        devServer: {
            host: '127.0.0.1',
            port: 8010,
            proxy: {
                '/api/': {
                    target: 'http://127.0.0.1:8080',
                    changeOrigin: true, pathRewrite: {'^/api': ''}
                },
                '/server/': {
                    target: 'http://tiramisu.localhost.com',
                    changeOrigin: true, pathRewrite: {'^/server': ''}
                }
            }
            ,
            historyApiFallback: {
                index: url.parse(publicPath).pathname
            }
        }
        ,
        devtool: options.dev ? '#eval-source-map' : '#source-map'
    }
}
