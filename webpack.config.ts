
import * as path from 'path';
import {Configuration, ProvidePlugin, optimize} from 'webpack';
import * as ExtractTextPlugin  from 'extract-text-webpack-plugin';

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const config: Configuration = {

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
      extractLess,
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity
      })
  ]
};

module.exports = config;