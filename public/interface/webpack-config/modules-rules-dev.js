let configs = require('./modules-rules-base')
configs.rules.push({
  test: /\.(png|jpg|jpeg|gif|svg|svgz)$/,
  use: [{
    loader: 'file-loader',
    options: {name: '[name]_[hash:6].[ext]', outputPath: 'images/test/'}
  }]
})
module.exports = configs