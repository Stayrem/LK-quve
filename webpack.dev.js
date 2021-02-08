const { merge } = require('webpack-merge');
const path = require('path');
const chalk = require('chalk');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common.js');

const hash = '[contenthash:8]';

const PATH = {
  DIST: path.join(__dirname, 'dist'),
  SRC: path.join(__dirname, 'src'),
  TEMPLATE: path.join(__dirname, 'src/template/index.html'),
  FONTS: path.join(__dirname, 'src/assets/fonts'),
  FAVICONS: path.join(__dirname, 'src/assets/favicons'),
  MOCKS: path.join(__dirname, 'src/mocks'),
  ASSETS: path.join(__dirname, 'src/assets'),
};

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: `[name]-${hash}.js`,
    path: PATH.DIST,
  },
  devServer: {
    contentBase: PATH.DIST,
    compress: false,
    writeToDisk: true,
    hot: true,
    port: 1337,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@utils': path.join(PATH.SRC, 'utils'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: PATH.MOCKS, to: path.join(PATH.DIST, 'mocks') },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssnanoPlugin({
        sourceMap: true,
      }),
    ],
  },
});
