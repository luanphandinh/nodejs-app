const helpers = require('./helpers');

const fs = require('fs');
const nodeModules = {};

fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  mode: 'development',
  devtool: 'source-map',

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
      '@utils': helpers.root('utils'),
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
          emitErrors: true,
          configFile: 'tslint.json',
          tsConfigFile: 'tsconfig.json',
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
