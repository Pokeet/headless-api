const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './src/main.js',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'headless-api'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
