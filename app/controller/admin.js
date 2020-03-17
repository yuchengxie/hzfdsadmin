'use strict';

const Controller = require('egg').Controller;
let BaseController = require('./base');

class AdminController extends BaseController {

  async index() {
    let res = await this.ctx.model.Admin.find({});
    this.ctx.body = {
      code: 20000,
      msg: res
    }
  }

  async add() {
    //验证数据合法
    let fields = this.ctx.request.body;
    fields.password = await this.service.tools.md5(fields.password);
    console.log('fields:', fields);
    //将数据写入数据库
    let user = new this.ctx.model.Admin(fields);
    user.save();
    console.log('写入成功');
    this.ctx.body = {
      code: 20000,
      msg: user.username + '写入数据库'
    }
  }

  async edit() {
    let fields_s = this.ctx.request.body;
    console.log('fields_s:', fields_s);
    let password = fields_s.password;
    let _id = fields_s._id;
    let fields = {
      _id: fields_s._id,
      mobile: fields_s.mobile,
      email: fields_s.email,
      role_id: fields_s.role_id,
      // is_super: fields_s.is_super
    }
    //需要修改密码
    if (password) {
      password = await this.service.tools.md5(password);
      fields = Object.assign(fields, {
        password
      });
    }
    await this.ctx.model.Admin.updateOne({
      _id
    }, fields);

    this.ctx.body = {
      code: 20000,
      msg: '编辑成功'
    }
  }

  // async edit() {
  //   // let opt={
  //   //   mobile:"123456"
  //   // }
  //   var _id = this.ctx.request.body.id;
  //   var password = this.ctx.request.body.password;
  //   var mobile = this.ctx.request.body.mobile;
  //   var email = this.ctx.request.body.email;
  //   // var role_id = this.ctx.request.body.role_id;
  //   // console.log('edit role_id:', role_id);
  //   // let fields = this.ctx.request.body;
  //   let fields_s = this.ctx.request.body;
  //   console.log('feilds_s:', fields_s);
  //   // fields.mobile="00000";
  //   let fields = {
  //     _id: fields_s._id,
  //     mobile: '888'
  //   }
  //   console.log('edit fields:', fields);
  //   // await this.ctx.model.Admin.updateOne({
  //   //   _id
  //   // }, {
  //   //   mobile
  //   // })
  //   if (password) {
  //     console.log('修改密码');
  //     //修改密码
  //     password = await this.service.tools.md5(password);
  //     console.log('pass:', password);
  //     // await this.ctx.model.Admin.updateOne({
  //     //   _id
  //     // }, fields)
  //   } else {
  //     console.log('不修改密码');
  //     //不修改密码
  //     let t = await this.ctx.model.Admin.updateOne({
  //       _id: _id
  //     }, fields);
  //     console.log('t:', t);

  //   }
  //   this.ctx.body = {
  //     code: 20000,
  //     msg: '管理用户编辑成功'
  //   }
  //   //验证数据合法
  //   // let fields = this.ctx.request.body;
  //   // let _id = fields._id;
  //   // console.log('fields:', fields);
  //   // //将数据写入数据库
  //   // await this.ctx.model.Admin.updateOne({
  //   //   _id
  //   // }, fields);
  //   // this.ctx.body = {
  //   //   code: 20000,
  //   //   msg: '编辑成功'
  //   // }
  // }
}

module.exports = AdminController;