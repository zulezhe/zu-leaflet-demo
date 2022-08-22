/*
 * @Author: wangchaoxu
 * @Date: 2020-05-12 17:17:38
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 18:01:10
 * @Description: vue配置文件
 */
'use strict';
const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin'); //gzip压缩
const TerserPlugin = require('terser-webpack-plugin'); 
const productionGzipExtensions = ['js', 'css', 'json', 'txt'];
const env = process.env.NODE_ENV;
let resolve = dir => {
  return path.resolve(__dirname, dir);
};
console.log(`==========当前运行环境:${env}=========`);
module.exports = {
  publicPath: env === 'production' ? './' : './',
  productionSourceMap: env === 'development',
  devServer: {
    host: '0.0.0.0',
    open: false,
    hot: true,
    port: 4322,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_API_URL, // 目标接口域名
        changeOrigin: true, // 是否跨域
        logLevel: 'debug'
        // pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' } // 把/app 替换成 /
      }
    },
    https: false,
    disableHostCheck: true
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/variables.less'), path.resolve(__dirname, './src/assets/styles/mixin.less'), path.resolve(__dirname, './src/assets/styles/common.less')]
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },
  configureWebpack: config => {
    config.devtool = '#eval-source-map';
    config.optimization = {
      // 开启代码分割
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vue: {
            name: 'vue',
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            priority: -10
          },
          vuex: {
            name: 'vuex',
            test: /[\\/]node_modules[\\/]vuex[\\/]/,
            priority: -10
          },         
          'element-ui': {
            name: 'element-ui',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            priority: -10
          },
         
        }
      }
    };
    // 忽略打包配置
    if (env === 'production') {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8
        }),
        new TerserPlugin({
          terserOptions: {
            extractComments: true,
            cache: true,
            parallel: true,
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      );
    }
  },
  chainWebpack: config => {
    config.resolve.extensions.add('.js').add('.vue');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@images', resolve('src/images'))
      .set('@cmp', resolve('src/components'))
      .set('@views', resolve('src/views'));
  }
};
