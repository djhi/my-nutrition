/* eslint no-var:0 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    './lib/core-js-no-number',
    'regenerator/runtime',
    '../app/main_client',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'client.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: path.join(__dirname, '..'),
    alias: {
      app: path.join(__dirname, '../app'),
    },
  },
  module: {
    loaders: [{
      test: /\.(otf|svg)(\?.+)?$/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.eot(\?\S*)?$/,
      loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject',
    }, {
      test: /\.woff2(\?\S*)?$/,
      loader: 'url-loader?limit=100000&mimetype=application/font-woff2',
    }, {
      test: /\.woff(\?\S*)?$/,
      loader: 'url-loader?limit=100000&mimetype=application/font-woff',
    }, {
      test: /\.ttf(\?\S*)?$/,
      loader: 'url-loader?limit=100000&mimetype=application/font-ttf',
    }, {
      test: /\.(css|scss)/,
      loader: 'style!css!sass',
    }],
  },
  plugins: [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment'),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      'Intl': 'imports?this=>global!exports?global.Intl!intl',
    }),
  ],
};
