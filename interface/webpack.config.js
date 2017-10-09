/* eslint-disable no-undef */
const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const url = require('url')
const Express = require('express')
const Proxy = require('http-proxy-middleware')
const publicPath = ''

module.exports = (options = {}) => {
  return ({
    entry: {
      vendor: './src/vendor',
      index: './src/main.js'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: options.dev ? '/assets/' : publicPath
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        }
        ,
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use:
            [{
              loader: 'url-loader',
              options: {limit: 10000}
            }]
        }
        , {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader'
        },
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new ExtractTextPlugin('styles.css'),
    ],
    resolve:
      {
        alias: {
          '~': resolve(__dirname, 'src')
        }
      }
    ,
    devServer: {
      host: '127.0.0.1',
      port: 8010,
      proxy:
        {
          '/api/':
            {
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
        index: url.parse(options.dev ? '/assets/' : publicPath).pathname
      }
    }
    ,
    devtool: options.dev ? '#eval-source-map' : '#source-map'
  })
}
