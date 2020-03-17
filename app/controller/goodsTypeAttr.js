"use strict";

let BaseController = require("./base");

class GoodsTypeAttributeController extends BaseController {
  async index() {
    let type_id = this.ctx.request.query.id;
    var goodsTypeAttr = await this.ctx.model.GoodsTypeAttribute.aggregate([{
        $lookup: {
          from: "goods_type",
          localField: "type_id",
          foreignField: "_id",
          as: "goods_type"
        }
      },
      {
        $match: {
          type_id: this.app.mongoose.Types.ObjectId(type_id)
        }
      }
    ]);
    let goodsType = await this.ctx.model.GoodsType.find({});

    this.ctx.body = {
      code: 20000,
      msg: {
        goodsType,
        goodsTypeAttr
      }
    }
  }

  async add() {
    let res = new this.ctx.model.GoodsTypeAttribute(this.ctx.request.body);
    await res.save();
    this.ctx.body = {
      code: 20000,
      msg: "增加商品类型属性成功"
    }
  }

  async edit() {
    let fields = this.ctx.request.body;
    let _id = fields.id;
    console.log('edit1:', fields);
    await this.ctx.model.GoodsTypeAttribute.updateOne({
        _id
      },
      fields
    );
    this.ctx.body = {
      code: 20000,
      msg: "编辑商品类型属性成功"
    }
  }
  // async add() {
  //   var cate_id = this.ctx.request.query.id;
  //   //获取类型数据
  //   var goodsTypes = await this.ctx.model.GoodsType.find();
  //   await this.ctx.render("admin/goodsTypeAttribute/add", {
  //     goodsTypes,
  //     cate_id
  //   });
  // }

  // async edit() {
  //   var _id = this.ctx.request.query.id;
  //   let list = await this.ctx.model.GoodsTypeAttribute.find({
  //     _id
  //   });
  //   var goodsTypes = await this.ctx.model.GoodsType.find({});
  //   await this.ctx.render("admin/goodsTypeAttribute/edit", {
  //     list: list[0],
  //     goodsTypes
  //   });
  // }

  // async doEdit() {
  //   var _id = this.ctx.request.body._id;
  //   var cate_id = this.ctx.request.body.cate_id;
  //   await this.ctx.model.GoodsTypeAttribute.updateOne({
  //       _id
  //     },
  //     this.ctx.request.body
  //   );
  //   await this.success(
  //     "/admin/goodsTypeAttribute?id=" + cate_id,
  //     "修改数据成功"
  //   );
  // }
}

module.exports = GoodsTypeAttributeController;