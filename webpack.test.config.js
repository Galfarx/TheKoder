const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const config = {
  entry: path.resolve(__dirname, 'get-tests.js'),
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'testBundle.js'
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    fs: 'empty'
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: 'mocha dist/testBundle.js',
      safe: true
    })
  ]
};

module.exports = config;
