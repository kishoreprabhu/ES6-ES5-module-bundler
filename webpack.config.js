const { resolve } = require('path');
const webpack = require('webpack');
const PROD_ENV = 1;
module.exports = {
  context: resolve(__dirname, 'src'),

  entry: ['./index.js'],
  output: {
    filename: PROD_ENV ? 'bundle.min.js' : 'bundle.js',
    path: resolve(__dirname, 'dist'),

    publicPath: '/dist/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
	historyApiFallback: true,
    // enable HMR on the server
    contentBase: './'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
      },
    ],
  },

  plugins:  [
    new webpack.DefinePlugin({
	  'process.env': {
		NODE_ENV: JSON.stringify( PROD_ENV ? 'production' : 'development' )
	  }
	}),
	new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],
};