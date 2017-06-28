var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV || 'development';
var isDev = NODE_ENV !== 'production';

var plugins = [
  new webpack.optimize.CommonsChunkPlugin('shared.js'),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
  })
];

!isDev && plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false,
    },
  })
);

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

module.exports = {

  devtool: 'source-map',

  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    var isDraft = dir.charAt(0) === '_' || dir.indexOf('components') >= 0;

    if (!isDraft && isDirectory(path.join(__dirname, dir))) {
      entries[dir] = path.join(__dirname, dir, 'index.js');
    }

    return entries;
  }, {}),

  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: isDev ? '/__build__/' : '../js/react-hold/',
    path: '../toplan.github.io/js/react-hold/'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'url-loader'
      }
    ]
  },

  resolve: {
    alias: {
      'react-hold': path.resolve(__dirname, '../src'),
      '$components': path.resolve(__dirname, './components')
    }
  },

  plugins

};
