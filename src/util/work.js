/*
 * @Author: zulezhe
 * @Date: 2021-04-30 16:34:26
 * @LastEditors: zulezhe
 * @LastEditTime: 2021-05-06 17:29:20
 * @Path: https://gitee.com/zulezhe/
 * @Description: js多线程的工具
 */

/**
 * 创建一个新线程,执行耗时操作
 * @example
 *
 * function sleep(){
 *   console.log('这是一个比较耗时的操作');
 *   for (var t = Date.now(); Date.now() - t <= 3000; );
 *   console.log('耗时操作执行完毕');
 * }
 *
 * const myWork=new MyWork(sleep);
 * console.log("我应该被阻塞的");
 *
 */
export default class MyWork {
  constructor(script) {
    this.script = script;
    // this.url = this.criptToUrl(script);
    // this.newWork(this.url);
    this.newWork(script);
  }
  criptToUrl(script) {
    return URL.createObjectURL(new Blob([`(${script.toString()})()`]));
  }
  newWork(script) {
    console.log(script);
    new Worker(URL.createObjectURL(new Blob([`(${script.toString()})()`])));
  }
  test() {
    let url = this.scriptToUrl(this.sleep);
    this.newWork(url);
    console.log('我应该被阻塞的');
  }
  //使用for循环实现阻塞
  sleep(d) {
    for (var t = Date.now(); Date.now() - t <= 3000; );
    console.log('另一个线程循环结束');
  }
}

function sleep() {
  console.log('这是一个比较耗时的操作');
  for (var t = Date.now(); Date.now() - t <= 3000; );
  console.log('耗时操作执行完毕');
}

const myWork = new MyWork(sleep);
console.log('我应该被阻塞的');
