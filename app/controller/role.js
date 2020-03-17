'use strict';

var BaseController = require('./base.js');

class RoleController extends BaseController {
	async index() {
		var result = await this.ctx.model.Role.find({});
		this.ctx.body = {
			code: 20000,
			msg: result
		}
	}

	async add() {
		let role = new this.ctx.model.Role({
			title: this.ctx.request.body.title,
			description: this.ctx.request.body.description,
		})
		await role.save();
		this.ctx.body = {
			code: 20000,
			msg: '新增角色成功'
		}
	}

	async edit() {
		let fields = this.ctx.request.body;
		console.log('edit fields:', fields);
		await this.ctx.model.Role.updateOne({
			_id: fields._id
		}, fields);
		this.ctx.body = {
			code: 20000,
			msg: '更新角色成功'
		}
	}

	async auth() {
		var role_id = this.ctx.request.query.id;
		console.log('role_id:', role_id);
		var [accessArr, list] = await this.service.admin.getAuthList(role_id);
		this.ctx.body = {
			code: 20000,
			msg: {
				accessArr,
				list
			}
		}
	}

	async doAuth() {
		let fields = this.ctx.request.body;
		console.log('fields:', fields);
		let role_id = fields.role_id;
		let access_node = fields.access_node;
		console.log('access_node:',access_node);
		//1.删除原有的数据
		await this.ctx.model.RoleAccess.deleteMany({
			"role_id": role_id
		});
		//2.将新的数据逐步添加数据库
		// let roleAccessData=[]
		for (let i = 0; i < access_node.length; i++) {
			let roleAccessData = new this.ctx.model.RoleAccess({
				role_id: role_id,
				access_id: access_node[i]
			})
			await roleAccessData.save();
		}
		this.ctx.body = {
			code: 20000,
			msg: '更新成功'
		}
	}
}

module.exports = RoleController;