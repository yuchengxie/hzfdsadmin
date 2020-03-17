'use strict';

const Controller = require('egg').Controller;

class GoodsCateController extends Controller {

  async index() {
    let result = await this.ctx.model.GoodsCate.aggregate([{
        $lookup: {
          from: "goods_cate",
          localField: "_id",
          foreignField: "pid",
          as: "items"
        }
      },
      {
        $match: {
          pid: "0"
        }
      }
    ]);
    this.ctx.body = {
      code: 20000,
      msg: result
    }
  }

  async top() {
    //顶级分类
    // let result = await this.ctx.model.GoodsCate.find({
    //   pid: "0"
    // });

    let list = await this.ctx.model.GoodsCate.aggregate([{
        $lookup: {
          from: "goods_cate",
          localField: "_id",
          foreignField: "pid",
          as: "items",
        }
      },
      {
        $match: {
          pid: "0"
        }
      }
    ]);
    console.log('list:', list);
    this.ctx.body = {
      code: 20000,
      msg: list
    }
  }

  async add() {
    let parts = this.ctx.request.body;
    if (parts.pid != "0") {
      parts.pid = this.app.mongoose.Types.ObjectId(parts.pid); //调用mongoose里面的方法把字符串转换成ObjectId
    }
    let goodsCate = new this.ctx.model.GoodsCate(parts);
    await goodsCate.save();
    this.ctx.body = {
      code: 20000,
      msg: '新增分类成功'
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    let _id = fields._id;

    if (fields.pid != "0") {
      fields.pid = this.app.mongoose.Types.ObjectId(fields.pid); //调用mongoose里面的方法把字符串转换成ObjectId
    }

    await this.ctx.model.GoodsCate.updateOne({
      _id
    }, fields);
    this.ctx.body = {
      code: 20000,
      msg: '编辑商品分类成功'
    }
  }
}

module.exports = GoodsCateController;