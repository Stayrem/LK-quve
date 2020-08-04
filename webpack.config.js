const path = require('path');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssnanoPlugin = require('cssnano-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');


const isDevelopment = process.env.NODE_ENV !== 'production';
const hash = isDevelopment ? '' : '-[contenthash:8]';

const PATH = {
  DIST: path.join(__dirname, 'dist'),
  SRC: path.join(__dirname, 'src'),
  TEMPLATE: path.join(__dirname, 'src/template/index.html'),
  FONTS: path.join(__dirname, 'src/assets/fonts'),
  FAVICONS: path.join(__dirname, 'src/assets/favicons'),
}
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    filename: `main${hash}.js`,
    path: PATH.DIST,
  },
  devServer: {
    contentBase: PATH.DIST,
    compress: false,
    writeToDisk: !isDevelopment,
    port: 1337,
    historyApiFallback: true,
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
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        test: /\.(scss|css)$/, 
        use: [ 
          { 
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          { 
            loader: "css-loader",
            options: { 
              modules: {
                localIdentName: '[sha1:hash:hex:4]',
              },
              importLoaders: 1, 
            } 
          },
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer(),
                ],
                sourceMap: true
            }
          },
          { 
            loader: "sass-loader",
            options: {
              additionalData: '@import "./src/css-utils/colors.scss";',
            },
          },
        ] 
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
        }
      },
      {
        test: /\.(svg|png|jpe?g|gif|webmanifest|ico)$/,
        include: PATH.FAVICONS,
        loader: 'file-loader',
        options: {
          name: `[name].[ext]`,
        }
      },
      ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json', '.css', '.scss'],
  },
  devtool: 'source-map',
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: PATH.TEMPLATE,
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${hash}.css`
    }),
  ],
  optimization: {
    minimizer: [
      new CssnanoPlugin({
        sourceMap: true
      })
    ]
  }
};
