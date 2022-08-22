/*
 * @Author: your name
 * @Date: 2020-09-03 22:50:23
 * @LastEditTime: 2021-04-22 19:03:16
 * @LastEditors: wangchaoxu
 * @Description: In User Settings Edit
 * @FilePath: \Moafly-nuxt\util\index.js
 */
/**
 * Created by jiachenpan on 16/11/18.
 */
import { MessageBox, Message, Notification } from 'element-ui';
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
  }
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @example:
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).Format("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).Format("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */

export function timeFormat(time, fmt = 'yyyy-MM-dd HH:mm:ss') {
  time = new Date(time);
  const o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours() % 12 === 0 ? 12 : time.getHours() % 12, // 小时
    'H+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };
  const week = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d'
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[time.getDay() + '']);
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}
/**
 * 时间分割
 * @param {*} startDate 开始时间
 * @param {*} endDate  结束时间
 * @param {*} amount   分割次数
 * @return {Array} temp 分割后的时间
 */
export function timeRange(startDate, endDate, amount) {
  const startTime = new Date(startDate);
  const endTime = new Date(endDate);
  const gap = (endTime - startTime) / amount;
  const temp = [];
  for (let i = 0; i < amount; i++) {
    startTime.setMilliseconds(startTime.getMilliseconds() + gap);
    temp[i] = timeFormat(new Date(startTime.getTime()));
  }
  return temp;
}

/**
 * 数组去重,一维简单数组
 * @param {*} arr
 * @returns
 */
const deduplication = arr => [...new Set(arr)];
/**
 * 保留非重复的数据
 * @param {Array} arr 处理的数组
 * @example
 *
 * filterNonUnique([1,2,2,3,4,1,2])
 * //[3, 4]
 */
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

/**
 * 保留重复的数据
 * @param {Array} arr 处理的数组
 * @example
 * saveUnique([1,2,2,3,4,1,2])
 * //[1, 2, 2, 1, 2]
 */
const saveUnique = arr => arr.filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

/**
 * 查找数组中相等的项
 *
 * @param {*} arr 需要查找的数组
 * @param {*} key 参照key
 * @param {*} val 参照值
 * @returns 返回具有传入参数的对象
 */
export function findEqual(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (ele[key] === val) {
      return ele;
    }
  }
}
/**
 * 根据val查找数组对象中相同val的项,返回Object,根据id查找tree数据中相等数据label
 * @param {*} arr
 * @param {*} val
 * @returns
 */
export function findKeyValue(arr, val) {
  let obj;
  function test(arr) {
    arr.forEach(ele => (ele.id === val ? (obj = ele) : ele.children ? test(ele.children) : ''));
  }
  test(arr);
  return obj;
}
/**
 *  @description: 对象转 url
 *  @param {Object} obj 对象形式
 *  @return {String} 字符串 类似 news_id=144&scorce=seo
 *  @author: wangchaoxu
 *  @remark 有bug,参数有时间的话,会被格式化
 *
 */
export function jsonToUrl(obj) {
  obj = JSON.stringify(obj);
  return obj
    .replace(/:/g, '=')
    .replace(/"/g, '')
    .replace(/,/g, '&')
    .match(/\{([^)]*)\}/)[1];
}

/**
 * 去除对象中所有符合条件的对象
 * @param {Object} obj 来源对象
 * @param {Function} fn 函数验证每个字段
 */
export function compactObj(obj, fn) {
  for (const i in obj) {
    if (typeof obj[i] === 'object') {
      compactObj(obj[i], fn);
    }
    if (fn(obj[i])) {
      delete obj[i];
    }
  }
}
/**
 * 深度合并对象,后面的额覆盖前面的
 * @param {*} FirstOBJ
 * @param {*} SecondOBJ
 * @returns
 */
export function deepObjectMerge(FirstOBJ, SecondOBJ) {
  // 深度合并对象
  for (var key in SecondOBJ) {
    FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]' ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : (FirstOBJ[key] = SecondOBJ[key]);
  }
  return FirstOBJ;
}
/**
 * 数组对象求和
 * @param {*} arr 数组
 * @param  {...any} param
 * @returns
 */
export function objSum(arr, ...param) {
  const temp = {};
  arr.forEach(function(item, index) {
    for (const k in item) {
      if (param.includes(k)) {
        if (typeof item[k] === 'string') {
          item[k] = item[k] * 1;
        }
        if (temp[k]) {
          temp[k] += item[k];
        } else {
          temp[k] = item[k];
        }
      }
    }
  });
  return temp;
}
/**
 * canvas绘制文字带背景
 * @param {*} canvas
 * @param {*} opt
 * @param {*} callback
 * @examples
 *  drawText(canvas, {
 *       width: 200,
 *       height: 100,
 *       imgUrl: './2.png',
 *       text: '我是文水电费电饭锅电饭锅s字',
 *       textStyle: {
 *         font: 'bold 26px strokeStyle',
 *         color: 'rgb(6, 227, 236)'
 *       }
 *  });
 */

export function drawText(canvas, opt) {
  return new Promise((resove, reject) => {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = opt.imgUrl;
    img.onload = () => {
      ctx.font = 'bold 26px strokeStyle';
      // 获取所绘制文字的宽度
      let textWidth = ctx.measureText(opt.text).width;
      canvas.width = textWidth + 80;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, img.height);
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';
      ctx.font = opt.textStyle.font;
      ctx.fillStyle = opt.textStyle.color;
      ctx.fillText(opt.text, canvas.width / 2, (canvas.height + 26 / 2) / 2, textWidth);
      resove(canvas.toDataURL('image/png'));
    };
  });
}
/**
 * @description: 从数组中找到最接近的数
 * @param {Number}  val
 * @param {Array}   data
 * @return {Number} 最接近当前值的结果
 * @author: wangchaoxu
 */
export function findNearByArr(val, data) {
  if (data.includes) return val;
  data.push(val);
  const newArr = data.sort((a, b) => a - b);
  const pre = newArr[newArr.indexOf(val) - 1];
  const next = newArr[newArr.indexOf(val) + 1];
  return val - pre > next - val || val - pre === next - val ? next : pre;
}
/**
 * @description: 避免数组漏删for循环
 * @param {Array} arr 数组
 * @param {Function} callback 回调函数
 * @author: wangchaoxu
 */
export function for2(arr, callback) {
  for (let i = arr.length; i > 0; ) {
    i--;
    const item = arr[i];
    if (typeof callback === 'function') {
      callback(item);
    }
  }
}
//验证上传数据类型
export function lastSubstring(str, split) {
  if (str === undefined || str === null || split === undefined || split === null) {
    return '';
  }
  return str.substring(str.lastIndexOf(split) + 1);
}
export function checkFile(files, fileType, fileSize) {
  let flag = true;
  let tip = '';
  files.forEach(item => {
    // 文件过大
    if (item.size > fileSize * 1024 * 1024) {
      flag = false;
      tip = ' 文件超过' + fileSize + 'M';
    }
    // 文件类型不属于可上传的类型
    if (!fileType.includes(lastSubstring(item.name, '.'))) {
      flag = false;
      tip = ' 文件类型不可上传';
    }
  });
  if (!flag) {
    Message({
      message: tip,
      type: 'warning',
      offset: 100
    });
  }
  return flag;
}
export function checkFile1(files, fileType, fileSize) {
  let flag = true;
  let tip = '';
  // 文件过大
  if (files.size > fileSize * 1024 * 1024) {
    flag = false;
    tip = ' File more than' + fileSize + 'M';
  }
  // 文件类型不属于可上传的类型
  if (!fileType.includes(lastSubstring(files.name, '.'))) {
    flag = false;
    tip = 'File types cannot be uploaded';
  }
  if (!flag) {
    Message({
      message: tip,
      type: 'warning',
      offset: 100
    });
  }
  return flag;
}
//html反转义
export function escape2Html(str) {
  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}
/**
 * 数字转千分位
 * @param {*} num
 */
export function numberFormat(num) {
  return ` ${numberParse(num)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
// export function numberFormat(num) {
//   return `$ ${numberParse(num)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }
/**
 * 千分位转普通数字
 * @param {*} num
 */
export function numberParse(num) {
  return num && num.toString().replace(/\$\s?|(,*)/g, '');
}
/**
 * 数字转成 k,w之类结尾的数
 * @param {*} num
 */
export function formatNumber(num) {
  if (num < 1e3) {
    return num;
  } else if (num >= 1e3 && num < 1e4) {
    return (num / 1e3).toFixed(1) + 'k';
  } else if (num >= 1e4 && num < 1e6) {
    return (num / 1e4).toFixed(1) + 'w';
  } else {
    return (num / 1e6).toFixed(1) + 'm';
  }
}
/**
 * 去除千分位
 * @param {*} num
 * @returns
 */
export function delcommafy(num) {
  if (!num) return num;
  num = num.toString();
  num = num.replace(/,/gi, '');
  return num;
}
