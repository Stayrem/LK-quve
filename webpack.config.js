const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
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
        test: /\.scss$/, 
        use: [ 
          { 
            loader: "style-loader" 
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
            loader: "sass-loader",
            options: {
              additionalData: '@import "./src/css-utils/_index.scss";',
            },
          },
        ] 
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        },
      ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'json', '.css', '.scss'],
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/template/index.html'),
    }),
  ],
};
