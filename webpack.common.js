const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';
const hash = isDevelopment ? '' : '-[contenthash:8]';

const PATH = {
  DIST: path.join(__dirname, 'dist'),
  SRC: path.join(__dirname, 'src'),
  TEMPLATE: path.join(__dirname, 'src/template/index.html'),
  FONTS: path.join(__dirname, 'src/assets/fonts'),
  FAVICONS: path.join(__dirname, 'src/assets/favicons'),
  MOCKS: path.join(__dirname, 'src/mocks'),
  ASSETS: path.join(__dirname, 'src/assets'),
};

module.exports = {
  entry: './src/index.jsx',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/template/index.html'),
    }),
    new BundleAnalyzerPlugin(),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@utils': path.join(PATH.SRC, 'utils'),
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
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
            options: {
              postcssOptions: {
                plugins: [
                  [
                    autoprefixer(),
                  ],
                ],
              },
            },
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
        },
      },
    ],
  },
};
