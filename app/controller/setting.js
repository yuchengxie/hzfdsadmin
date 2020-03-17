'use strict';

const Controller = require('egg').Controller;

class SettingController extends Controller {
  async setMenu() {
    let menu = this.ctx.request.body;
    console.log('menu:', menu);
    //1.删除原来旧数据
    if (menu.length > 0) {
      await this.ctx.model.Access.deleteMany({});
    }
    //2.更新数据
    for (let i = 0; i < menu.length; i++) {
      let m = menu[i];
      m.label = m.label;
      m.name = m.name;
      m.module_id = '0';
      let n = new this.ctx.model.Access(m);
      await n.save();
      if (m.children) {
        for (let j = 0; j < m.children.length; j++) {
          let mc = m.children[j];
          mc.label = mc.label;
          mc.name = mc.name;
          mc.module_id = n._id;
          let nc = new this.ctx.model.Access(mc);
          await nc.save();
        }
      }
    }
    //3.返回数据
    let list = await this.ctx.model.Access.find({},'_id module_id name label url ');
    console.log('list:', list);
    this.ctx.body = {
      code: 20000,
      msg: list
    }
  }
}

module.exports = SettingController;