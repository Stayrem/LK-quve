const path = require('path');
const chalk = require('chalk');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const PostCssPreset = require('postcss-preset-env');
const CopyPlugin = require('copy-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv === 'development';
const isLocal = nodeEnv === 'local';
const isProduction = nodeEnv === 'production';
const isAnalyse = nodeEnv === 'analyse';
const hash = isDevelopment ? '' : '-[contenthash:8]';
const dotEnvFile = isLocal ? path.join(__dirname, '.env.mock') : path.join(__dirname, '.env.prod');

const PATH = {
  DIST: path.join(__dirname, 'dist'),
  BUILD: path.join(__dirname, 'build'),
  SRC: path.join(__dirname, 'src'),
  TEMPLATE: path.join(__dirname, 'src/template/index.html'),
  FONTS: path.join(__dirname, 'src/assets/fonts'),
  FAVICONS: path.join(__dirname, 'src/assets/favicons'),
  MOCKS: path.join(__dirname, 'src/mocks'),
  ASSETS: path.join(__dirname, 'src/assets'),
};
module.exports = {
  mode: isAnalyse || isProduction ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    publicPath: isAnalyse || isProduction ? '/' : '/', //TODO Прописать корректный для прода
    filename: `[name]${hash}.js`,
    path: isProduction ? PATH.BUILD : PATH.DIST,
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
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: path.join(PATH.ASSETS, '/css/vendor.scss'),
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[sha1:hash:hex:4]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "./src/css-utils/colors.scss"; @import "./src/css-utils/mixins.scss"; @import "./src/css-utils/animations.scss";',
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        include: path.join(PATH.ASSETS, '/css/vendor.scss'),
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        exclude: PATH.FAVICONS,
        options: {
          name: `[name]${hash}.[ext]`,
          outputPath: 'assets/images',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: PATH.FONTS,
        loader: 'file-loader',
        options: {
          name: `[name]${hash}.[ext]`,
          outputPath: 'assets/fonts',
        },
      },
      {
        test: /\.(svg|png|jpe?g|gif|webmanifest|ico)$/,
        include: PATH.FAVICONS,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/favicons',
        },
      },
    ],
  },
  devtool: isProduction ? false : 'source-map',
  plugins: (() => {
    const defaultPlugins = [
      new Dotenv({
        path: dotEnvFile,
        safe: true,
        allowEmptyValues: true,
      }),
      new ProgressBarPlugin({
        format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        clear: false,
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: PATH.TEMPLATE,
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${hash}.css`,
      }),
      new CopyPlugin({
        patterns: [
          { from: PATH.MOCKS, to: path.join(PATH.DIST, 'mocks') },
        ],
      }),
    ];
    if (isAnalyse) {
      defaultPlugins.push(new BundleAnalyzerPlugin());
    }
    if (!isDevelopment) {
      defaultPlugins.push(new PostCssPreset({
        browsers: 'last 2 versions',
      }));
    }
    return defaultPlugins;
  })(),
  optimization: {
    minimize: isProduction || isAnalyse,
    minimizer: [
      new CssnanoPlugin({
        sourceMap: isDevelopment,
      }),
      new TerserPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendorApex: {
          test: /[\\/]node_modules[\\/](apexcharts)[\\/]/,
          priority: -5,
        },
        vendorNodeModules: {
          test: /[\\/]node_modules[\\/](?!apexcharts)(!react)(!react-dom)(.[a-zA-Z0-9.\-_]+)[\\/]/,
          priority: -10,
        },
        default: {
          priority: -20,
        },
      },
    },
  },
};
