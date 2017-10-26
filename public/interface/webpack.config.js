const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const url = require('url')
const publicPath = '/assets/'
const itemName = 'dist'
const devPath = '/interface/' + itemName + '/'

module.exports = (options = {}) => {
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
          test: /\.(css|scss|sass)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|svgz)$/,
          use: [{
            loader: 'url-loader',
            options: {limit: 1},
          }, {
            loader: 'file-loader',
            options: {name: '[name]_[hash:6].[ext]', outputPath: 'images/'}
          }]
        }
        , {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [{
            loader: 'file-loader',
            options: {name: '[hash:8]_[name].[ext]', outputPath: 'fonts/'}
          }]

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
    resolve: {
      alias: {
        'src': resolve(__dirname, 'src'),
        'public': resolve(__dirname, 'src/public-resource'),
        'images': resolve(__dirname, 'src/public-resource/images'),
        'modules': resolve(__dirname, 'src/public-resource/modules'),
        'iconfont': resolve(__dirname, 'src/public-resource/iconfont'),
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
        index: url.parse(options.dev ? devPath : publicPath).pathname
      }
    }
    ,
    devtool: options.dev ? '#eval-source-map' : '#source-map'
  }
}
