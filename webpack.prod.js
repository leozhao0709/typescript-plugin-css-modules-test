const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: ({ chunk: { name } }) => {
      return name.match(/webWorker$/i)
        ? '[name].js'
        : '[name].[contenthash:8].js';
    },
    // publicPath: 'https://cdn.abc.com'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '**',
          context: 'public',
          globOptions: {
            dot: true,
            ignore: [path.resolve(process.cwd(), 'public/*.html')],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
  ],
  optimization: {
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin({})],

    // 分割代码块
    splitChunks: {
      /**
       * initial 入口 chunk，对于异步导入的文件不处理
          async 异步 chunk，只对异步导入的文件处理
          all 全部 chunk
       */
      chunks: 'all',
      name: 'common',
      // minSize: 30 * 1024, // unit: byte, default around 20k

      // 缓存分组
      cacheGroups: {
        'lodash-es': {
          name: 'lodash-es',
          chunks: 'all',
          test: /lodash-es/,
          // priority: 10,
        },
        react: {
          name: 'react',
          chunks: 'all',
          test: /react/,
          // priority: 10,
        },
        jquery: {
          name: 'jquery',
          chunks: 'all',
          test: /jquery/,
          // priority: 10,
        },
      },
    },
  },
});
