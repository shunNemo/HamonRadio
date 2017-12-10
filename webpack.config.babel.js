import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'

import recursiveReaddir from './utils/recursiveReaddir'
import pugData from './utils/pugData'

let pages = []

recursiveReaddir('../src/pug', filepath => {
  const rootpath = '../src/pug/'
  const tar = filepath.substr(rootpath.length)

  if (tar) {
    pages.push(tar)
  }
})

const config = {
  context: path.join(__dirname, './src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.join(__dirname, './dest'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
    // TODO: パッケージアップデートの関係でeslint 3系だとエラーが出るが、4系にすると、動かなくなるので原因を追求する
    // {
    //   enforce: 'pre',
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: 'eslint-loader',
    //   options: {
    //     failOnError: false,
    //   },
    // },
    {
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'stage-0']
      }
    },
    {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => {
                autoprefixer({
                  browsers: ['ie >= 11', 'Android > 4.4', 'iOS > 9']
                })
              }
            }
          },
          'resolve-url-loader',
          'stylus-loader',
        ]
      })
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader',
      options: {
        pretty: true,
        root: path.join(__dirname, './src/pug/'),
      }
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            context: path.join(__dirname, './src/img'),
            name: 'assets/images/[path][name].[ext]'
          }
        }
      ]
    }]
  },
  resolve: {
    extensions: ['.js', '.styl'],
    alias: {
      images: path.join(__dirname, './src/img')
    }
  },
  devtool: '#inline-source-map',
  devServer: {
    inline: true,
    contentBase: path.join(__dirname, './dest'),
    host: '0.0.0.0',
    port: 3000,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(`assets/css/[name].css`),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      chunks: ['app'],
      template: `pug/index.pug`,
      data: pugData('../src/data'),
      page: 'index',
      cache: false
    }),
    ...pages.map( filepath => {
      const pathAry = filepath.split('/')

      return new HtmlWebpackPlugin({
        chunks: pathAry[0] === 'sp' ? ['sp/app'] : ['app'],
        template: `pug/${filepath}/index.pug`,
        filename: `${filepath}/index.html`,
        data: pugData('../src/data'),
        page: pathAry[0] !== 'sp' ? filepath : pathAry.length === 1 ? 'index' : filepath.replace(/sp\//, ''),
        cache: false
      })
    }),
    new CopyWebpackPlugin([
      {
        context: 'static/',
        from: 'share/*',
        to: 'assets/images'
      },
      {
        context: 'static/',
        from: '*.*',
      }
    ])
  ]
}

export default config;
