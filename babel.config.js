/*
 * @Author: zulezhe
 * @Date: 2022-08-22 20:24:42
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-22 20:57:17
 * @Path: https://gitee.com/zulezhe/
 * @Description:
 */
module.exports = {
  // presets: ['@vue/cli-plugin-babel/preset']
  presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { modules: false }]],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    [
      '@supermap/babel-plugin-import',
      {
        libraryName: '@supermap/iclient-leaflet'
      }
    ]
  ]
};
