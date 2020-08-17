const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/index.js', // entry js file(main file whch rndr in d brwsr)
  output: {
        path: path.join(__dirname, '/dist'), 
        filename: 'index_bundle.js', // plc wer bndld app wl b srvd
      //   publicPath: '/'
     },
  devServer: {
        historyApiFallback: true,
        inline: true, // autorfrsh 
        port: 8080 // port server no.
     },
  module: {
        rules: [
           {
              test: /\.jsx?$/, // srch fr js fls 
              exclude: /node_modules/,
              loader: 'babel-loader'
          },
          {
              test: /\.css$/, 
              use: ["style-loader", "css-loader"],
            //   loader: 'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]' //css mdls
          },
          {
              test: /\.(png|jpg|webp|jpeg|svg)$/, //img
              loader: 'url-loader'
          }
     ]
  },
  plugins: [
     new HtmlWebpackPlugin({
        template: './src/index.html'
     })
  ]
}

module.exports = config;