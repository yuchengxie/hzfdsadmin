'use strict';

const Controller = require('egg').Controller;

class GoodsTpeController extends Controller {
  async index() {
    let list = await this.ctx.model.GoodsType.find({});
    this.ctx.body = {
      code: 20000,
      msg: list
    }
  }

  async add() {
    let goodsType = this.ctx.model.GoodsType(this.ctx.request.body);
    await goodsType.save();
    this.ctx.body = {
      code: 20000,
      msg: '商品类型添加成功'
    }
  }

  async edit(){
    let fields=this.ctx.request.body;
    let _id=fields._id;
    await this.ctx.model.GoodsType.updateOne({_id},fields);
    this.ctx.body={
      code:20000,
      msg: '商品类型编辑成功'
    }
  }
}

module.exports = GoodsTpeController;