const helpers = require('./helpers');

const fs = require('fs');
nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    'server': helpers.root('src', 'server.ts'),
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    alias: {
      '@src': helpers.root('src'),
    },
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },

  target: 'node',
  externals: nodeModules,
};
