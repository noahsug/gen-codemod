const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './ui/index.js',
  output: {
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  mode: DEV ? 'development' : 'production',
}
