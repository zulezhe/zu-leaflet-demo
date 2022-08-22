/*
 * @Author: wangchaoxu
 * @Date: 2021-04-21 19:13:36
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-08-23 00:31:26
 * @Path: https://gitee.com/wangchaoxu/
 * @Description:
 */
export function getData(params) {
  return new Promise((resolve, reject) => {
    fetch('./data/test.json')
      .then(response => {
        return response.json();
      })
      .then(res => {
        resolve({
          data: res.slice((params.pageNumber - 1) * params.pageSize, params.pageNumber * params.pageSize),
          total: res.length
        });
      })
      .catch(err => {
        reject(err);
      });
  });
}
