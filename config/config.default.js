/* eslint valid-jsdoc: "off" */

'use strict';
// import menu from './menu';
var path = require("path");
let menu = require('./menu');
let template = require('./template');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577093073011_8675';

  let abcpath = path.join(__dirname, "../");
  config.uploadDir = path.join(abcpath, "app/public/upload");

  // add your middleware config here
  config.middleware = [];

  config.menu = menu;

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  exports.mongoose = {
    url: "mongodb://admin:qwerty123@118.190.105.235:27017/hzfds_admin",
    options: {
      // useUnifiedTopology: true,
    }
  }

  exports.jwt = {
    secret: "123456"
  };

  //跨域设置
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  // exports.security = {
  //   csrf: {
  //     // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
  //     ignore: ctx => {
  //       // if (
  //       //   ctx.request.url == "/admin/goods/goodsUploadImage" ||
  //       //   ctx.request.url == "/admin/goods/goodsUploadPhoto" ||
  //       //   ctx.request.url == "/pass/doLogin" ||
  //       //   ctx.request.url == "/user/addAddress" ||
  //       //   ctx.request.url == "/user/editAddress"
  //       // ) {
  //       //   return true;
  //       // }
  //       // return false;
  //       return true;
  //     }
  // }
  return {
    ...config,
    ...userConfig,
  };
};