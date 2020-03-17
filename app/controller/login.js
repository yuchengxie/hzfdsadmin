'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async setMenu() {
    console.log('menu:', this.config.menu);
    this.ctx.body = {
      menu: this.config.menu
    }
  }
  async login() {
    let fields = this.ctx.request.body;
    fields.password = await this.service.tools.md5(fields.password);
    let result = await this.ctx.model.Admin.find({
      "username": fields.username,
      "password": fields.password
    });
    console.log('result:', result);
    if (result.length > 0) {
      let role_id = result[0].role_id;
      console.log('role_id:', role_id);
      var [accessArr, list] = await this.service.admin.getAuthList(role_id);
      this.ctx.body = {
        code: 20000,
        msg: {
          msg: {
            accessArr,
            list
          }
        }
      }
    } else {
      this.ctx.body = {
        code: 20001,
        menu: '用户名或密码错误',
      }
    }
    // this.ctx.body = {
    //   code: 20000,
    //   menu: this.config.menu,
    // }
  }
}

module.exports = LoginController;