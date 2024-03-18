
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
// const currentDate = new Date();

if (typeof window !== "undefined") {
  const flatpickr = require('flatpickr');

  flatpickr('.flatpickr', {
    enableTime: true,
    dateFormat: 'DD-MM-YYYY H:i',
    minDate: 'today'
});
}

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
  ],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }
    ]
  }
}
