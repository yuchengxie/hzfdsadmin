'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  async index() {
    let goodsResult = await this.ctx.model.Goods.find({});
    let goodsColor = await this.ctx.model.GoodsColor.find({});
    this.ctx.body = {
      code: 20000,
      msg: {
        goodsResult,
        goodsColor
      }
    }
  }

  async add() {
    let formFields = this.ctx.request.body;
    console.log('goods add formFields:', formFields);
    if (formFields.goods_type_id && typeof formFields.goods_type_id === 'string') {
      formFields.goods_type_id = this.app.mongoose.Types.ObjectId(formFields.goods_type_id);
    }
    let goods_color = this.service.tools.arrToStr(formFields.goods_color || "");
    formFields.goods_color = goods_color || "";
    //1.增加商品信息
    let goodsRes = await this.ctx.model.Goods(formFields);
    let result = await goodsRes.save();
    //2.增加商品图库信息
    // //2.1将原有数据删除
    // let goods_id = formFields.id || "";
    // console.log('goods_id:', goods_id);
    // if (goods_id) {
    //   let rrrr = await this.ctx.model.GoodsImage.deleteMany({
    //     goods_id: goods_id
    //   })
    //   console.log('rrrr:', rrrr);
    // }
    //2.2写入新数据
    let goods_image_list = formFields.goods_image_list || "";
    if (result._id && goods_image_list) {
      if (typeof goods_image_list === 'string') {
        goods_image_list = new Array(goods_image_list);
      }
      for (let i = 0; i < goods_image_list.length; i++) {
        let goodsImageRes = new this.ctx.model.GoodsImage({
          goods_id: result._id,
          img_url: goods_image_list[i]
        })
        await goodsImageRes.save();
      }
    }
    //3.增加商品类型信息
    let attr_value_list = formFields.attr_value_list;
    let attr_id_list = formFields.attr_id_list;
    if (result._id && attr_value_list && attr_id_list) {
      if (typeof attr_id_list === 'string' || typeof attr_value_list === 'string') {
        attr_id_list = new Array(attr_id_list);
        attr_value_list = new Array(attr_value_list);
      }
      for (let i = 0; i < attr_value_list.length; i++) {
        if (attr_value_list[i]) {
          let goodsTypeAttributeRes = await this.ctx.model.GoodsTypeAttribute.find({
            _id: attr_id_list[i]
          });
          let goodsAttRes = new this.ctx.model.GoodsAttr({
            goods_id: result.id,
            cate_id: formFields.cate_id,
            type_id: formFields.goods_type_id,
            attribute_id: attr_id_list[i],
            attribute_type: goodsTypeAttributeRes[0].attr_type,
            attribute_title: goodsTypeAttributeRes[0].title,
            attribute_value: attr_value_list[i]
          })
          await goodsAttRes.save();
        }
      }
    }
    this.ctx.body = {
      code: 20000,
      msg: '添加商品成功'
    }
  }

  async edit() {
    let formFields = this.ctx.request.body;
    console.log('edit:', formFields);
    if (formFields.goods_type_id && typeof formFields.goods_type_id === 'string') {
      formFields.goods_type_id = this.app.mongoose.Types.ObjectId(formFields.goods_type_id);
    }
    formFields.goods_color = this.service.tools.arrToStr(formFields.goods_color) || "";
    let goods_id = formFields._id;
    await this.ctx.model.Goods.updateOne({
      _id: goods_id
    }, formFields);

    //修改图库信息(增加操作)
    //2.1将原有数据删除
    if (goods_id) {
      let rrrr = await this.ctx.model.GoodsImage.deleteMany({
        goods_id: goods_id
      })
    }
    let goods_image_list = formFields.goods_image_list;
    if (goods_id && goods_image_list) {
      if (typeof goods_image_list === 'string') {
        goods_image_list = new Array(goods_image_list);
      }
      for (let i = 0; i < goods_image_list.length; i++) {
        let goodsImageRes = new this.ctx.model.GoodsImage({
          goods_id: goods_id,
          img_url: goods_image_list[i]
        })
        await goodsImageRes.save();
      }
    }
    //修改商品类型数据
    //1.删除之前的数据
    await this.ctx.model.GoodsAttr.deleteMany({
      goods_id: goods_id
    })
    //2.增加修改了的数据
    let attr_value_list = formFields.attr_value_list;
    let attr_id_list = formFields.attr_id_list;
    if (goods_id && attr_value_list && attr_id_list) {
      if (typeof attr_id_list === 'string' || typeof attr_value_list === 'string') {
        attr_id_list = new Array(attr_id_list);
        attr_value_list = new Array(attr_value_list);
      }
      for (let i = 0; i < attr_value_list.length; i++) {
        let goodsTypeAttributeRes = await this.ctx.model.GoodsTypeAttribute.find({
          _id: attr_id_list[i]
        });
        let goodsAttrRes = new this.ctx.model.GoodsAttr({
          goods_id: goods_id,
          cate_id: formFields.cate_id,
          type_id: formFields.goods_type_id,
          attribute_id: attr_id_list[i],
          attribute_type: goodsTypeAttributeRes[0].attr_type,
          attribute_title: goodsTypeAttributeRes[0].title,
          attribute_value: attr_value_list[i]
        })
        await goodsAttrRes.save();
      }
    }
    this.ctx.body = {
      code: 20000,
      msg: '修改商品数据成功'
    }
  }

  async getAttrs() {
    let params = this.ctx.request.query;
    let type_id = params.type_id;
    let goods_id = params.goods_id;
    let goodsAttrs = await this.ctx.model.GoodsAttr.find({
      type_id: type_id,
      goods_id: goods_id
    })
    this.ctx.body = {
      code: 20000,
      msg: {
        goodsAttrs
      }
    }
  }

  async mix() {
    let goods_id = this.ctx.request.query.id;
    console.log('mix goods_id:', goods_id);
    //获取所有颜色
    let goodsColor = await this.ctx.model.GoodsColor.find();
    //获取所有商品类型
    let goodsType = await this.ctx.model.GoodsType.find({});
    //获取商品相册
    let goodsPhoto = await this.ctx.model.GoodsImage.find({
      goods_id: goods_id
    });
    //获取商品分类
    let goodsCate = await this.ctx.model.GoodsCate.aggregate([{
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
    ])

    this.ctx.body = {
      code: 20000,
      msg: {
        goodsColor,
        goodsType,
        goodsCate,
        goodsPhoto
      }
    }
  }
}

module.exports = GoodsController;