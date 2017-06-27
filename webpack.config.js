const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const hostAddress = 'http://localhost:8040/';

let assetsPath = path.join(__dirname, 'dist');
let nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
	devtool: 'cheap-source-map',
  entry: [
    // 'babel-polyfill',
    'webpack-hot-middleware/client?path='+hostAddress+'__webpack_hmr&timeout=20000&reload=true',
    './src/index.js'
  ],
  output: {
    filename: 'app.js',
    path: assetsPath,
    publicPath: hostAddress
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'ems oa',
      filename: 'index.html',
      template: 'index.template.html',
      // favicon: path.join(__dirname, 'favicon.ico')
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.json$/,
        loader: "json-loader"
      },
      { test: /\.js$/,
        loader: "react-hot-loader/webpack!babel-loader",
        exclude: [/node_modules/, /dist/]
      },
			{
        test: /(\.css|\.scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1}//这里可以简单理解为，如果css文件中有import 进来的文件也进行处理
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({root: loader.resourcePath}),
                require('autoprefixer')(), //CSS浏览器兼容
                require('cssnano')()  //压缩css
              ]
            }
          },
          'sass-loader',
        ]
        //loader: "style-loader!css-loader!postcss-loader!sass-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=assets/images/[name].[ext]'
      },
      { test: /\.(ttf|eot|svg|woff|woff2)(\?.*)?$/,
        loader: "url-loader?limit=8192&name=assets/fonts/[name].[ext]"
      }
    ],
    //noParse: [path.resolve(nodeModulesPath, '/react/dist/react.min'),path.resolve(nodeModulesPath, '/lodash/lodash.js')]
  },
  // postcss: [
  //   autoprefixer()
  // ],
  resolve: {
    extensions: ['.json', '.js', '.map' ],
    // modules: ["src", 'node_modules', path.join(__dirname, '../node_modules')],
    alias: {
      'config': path.join(__dirname, 'config.js'),
      'APIFolder': path.join(__dirname, './src/api'),
      'UtilsFolder': path.join(__dirname, './src/utils'),
      'UIComponentFolder': path.join(__dirname, './src/UIComponent'),
      'ComponentFolder': path.join(__dirname, './src/components'),
      'ActionsFolder': path.join(__dirname, './src/actions'),
      'AssetsFolder': path.join(__dirname, './src/assets'),
      'Models': path.join(__dirname, './src/models'),
      'DecoratorsFolder': path.join(__dirname, './src/decorators')
    }
  }
}
