var path = require('path')
var webpack = require('webpack')

const env = process.env.NODE_ENV;

const isProduction = env === 'production';

const entry = isProduction ? ['./index'] : [
  'webpack-hot-middleware/client',
  './index'
];

module.exports = {
  mode: env || 'development',
  devtool: isProduction ? null : 'cheap-module-eval-source-map',
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ],
        include: __dirname
      }
    ]
  }
}
