/*
 * @Author: your name
 * @Date: 2020-10-08 23:42:58
 * @LastEditTime: 2022-08-23 21:15:19
 * @LastEditors: zulezhe
 * @Description: In User Settings Edit
 * @FilePath: \moafly-spa2\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0, //允许声明未使用变量
    'no-useless-escape': 0, //忽略转义字符验证
    'space-before-function-paren': 0, // 关闭函数括号前的空格验证
    'spaced-comment': 0 //注释风格要不要有空格
  },
  globals: {
    google: true,
    Vue: true,
    map: true,
    Cesium: false,
  }
};
