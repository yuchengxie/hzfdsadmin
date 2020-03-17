"use strict";

// const path = require("path");
// const fs = require("fs");

// const pump = require("mz-modules/pump");
// let OSS = require("ali-oss");
/*
1、安装mz-modules

https://github.com/node-modules/mz-modules

https://github.com/mafintosh/pump
*/

var BaseController = require("./base.js");
class FocusController extends BaseController {
  async index() {
    let result = await this.ctx.model.Focus.find({});
    this.ctx.body = {
      code: 20000,
      msg: result
    }
  }

  async add() {
    let focus = new this.ctx.model.Focus(this.ctx.request.body);
    await focus.save();
    this.ctx.body = {
      code: 20000,
      msg: '新增轮播图成功'
    }
  }

   async edit() {
    let params = this.ctx.request.body;
    console.log('edit:',params);
    let _id = params._id;
    await this.ctx.model.Focus.updateOne({
      _id
    }, params);
    this.ctx.body = {
      code: 20000,
      msg: '更新成功'
    }
  }

  // async edit() {
  //   var id = this.ctx.request.query.id;
  //   var result = await this.ctx.model.Focus.find({
  //     _id: id
  //   });
  //   console.log('edit:', result[0]);
  //   this.ctx.body = {
  //     code: 20000,
  //     msg: result[0]
  //   }
  // }

  // async doEdit() {
  //   let params = this.ctx.request.body;
  //   console.log('doEdit:',params);
  //   let _id = params._id;
  //   await this.ctx.model.Focus.updateOne({
  //     _id
  //   }, params);
  //   this.ctx.body = {
  //     code: 20000,
  //     msg: '更新成功'
  //   }
  // }
}

module.exports = FocusController;