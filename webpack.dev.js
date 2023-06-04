const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
  },
  target: 'web',
  devServer: {
    static: [path.join(process.cwd(), 'public')],
    compress: true,
    host: 'localhost',
    port: 9001,
    liveReload: true,
    // // 设置代理
    // proxy: {
    //   // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
    //   '/api': 'http://localhost:3000',

    //   // 将本地 /api2/xxx 代理到 localhost:3000/xxx
    //   '/api2': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '/api2': '',
    //     },
    //   // resolve cors problem
    //    changeOrigin: true,
    //   },
    // },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => !resourcePath.includes('node_modules'),
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [
    // new CopyPlugin({ patterns: [{ from: '', to: '' }] }),
  ],
});
