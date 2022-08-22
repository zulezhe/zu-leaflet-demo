import Vue from 'vue';
import { Message } from 'element-ui';
//  当前验证方法可以直接在elementui的表单验证中使用,自定义验证规则
/**
 * 手机号验证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
function isPhone(rule, value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  if (!value) {
    callback(new Error('请输入手机号码'));
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的11位手机号码'));
  } else {
    callback();
  }
}
//邮箱验证
function validateEamail1(rule, value, callback) {
  if (value === '') {
    callback(new Error('Enter a valid email address'));
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        callback(new Error('Enter a valid email address'));
      }
    }
    callback();
  }
}
//邮箱验证
function validateEmail(value) {
  if (value === '') {
    Message('Enter a valid email address');
    return false;
  } else {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(value)) {
        Message('Enter a valid email address');
        return false;
      }
    }
    return true;
  }
}
// 密码验证
function isPassword(rule, value, callback) {
  const regex = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; //6-20位字母数字集合
  if (!value) {
    callback(new Error('Please enter your password.'));
  } else if (!regex.test(value)) {
    callback(new Error('Must be a set of 6-20 alphanumeric characters'));
  } else {
    callback();
  }
}

function validPassword(value) {
  const regex = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; //6-20位字母数字集合
  if (!value) {
    Message({
      message: '请输入密码',
      type: 'error'
    });
    // callback(new Error('请输入密码'));
    return false;
  } else if (!regex.test(value)) {
    // callback(new Error('必须是6-20位字母数字集合'));
    Message({
      message: '必须是6-20位字母数字集合',
      type: 'error'
    });
    return false;
  } else {
    // callback();
    return true;
  }
}
// 验证用户名
function isNickName(rule, value, callback) {
  const reg1 = /^[\u4E00-\u9FA5]+$/;
  const reg2 = /^[\u4E00-\u9FA5]{2,18}$/;
  if (!value) {
    callback(new Error('请输入用户名'));
  } else if (!reg1.test(value)) {
    callback(new Error('用户名必须为汉字'));
  } else if (!reg2.test(value)) {
    callback(new Error('最少2个字符,最多18个字符'));
  } else {
    callback();
  }
}
// 验证用户名是否合法，必须是以字母开头，只能包含字母数字下划线和减号，4到16位
function isAccount(rule, value, callback) {
  const reg = /^[a-zA-Z]\w{2,15}$/;
  if (!value) {
    callback(new Error('请输入账户'));
  } else if (!reg.test(value)) {
    callback(new Error('以字母开头，只能包含字母数字下划线和减号，3到14位'));
  } else {
    callback();
  }
}

/* 判断是否为数字,包括浮点数 */
function isNumber(rule, value, callback) {
  const reg = /^(-?\d+)(\.\d+)?$/;
  if (!value) {
    callback(new Error('请输入内容'));
  } else if (!reg.test(value)) {
    callback(new Error('内容必须是数字'));
  } else {
    callback();
  }
}

function isLng(rule, value, callback) {
  //验证经度
  const reg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,10})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,10}|180)$/;
  if (!value) {
    callback(new Error('请输入经度'));
  } else if (!reg.test(value)) {
    callback(new Error('经度整数部分为0-180,小数部分为0到10位!'));
  } else {
    callback();
  }
}
// //校验纬度是否符合规范
// //纬度
function isLat(rule, value, callback) {
  const reg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,10}|90\.0{0,10}|[0-8]?\d{1}|90)$/;

  if (!value) {
    callback(new Error('请输入经度'));
  } else if (!reg.test(value)) {
    callback(new Error('纬度整数部分为0-90,小数部分为0到10位!'));
  } else {
    callback();
  }
}
/**
 * @Description:   价格验证，正则（小数点前8位，小数点后5位）
 */
function isPrice(rule, value, callback) {
  const reg = /^(?:0\.\d{0,1}[1-9]|(?!0)\d{1,8}(?:\.\d{0,4}[1-9])?)$/;
  if (!value) {
    return callback(new Error('Must fill in'));
  } else if (!/^(-?\d+)(\.\d+)?$/.test(Number(value))) {
    callback(new Error('Must be a number'));
  } else if (!reg.test(Number(value))) {
    callback(new Error('整数部分最大8位，小数部分最多保留5位'));
  } else {
    callback();
  }
}
//验证图片格式是否通过验证
// 验证是否整数
function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  if (!Number(value)) {
    callback(new Error('请输入正整数'));
  } else {
    const re = /^[0-9]*[1-9][0-9]*$/;
    const rsCheck = re.test(value);
    if (!rsCheck) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  }
}
function isHttps() {
  return 'https:' == document.location.protocol ? true : false;
}
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export { validateEamail1, validPassword, validateEmail, isPhone, isNickName, isPassword, isAccount, isNumber, isLng, isLat, isPrice, isInteger, isHttps };
