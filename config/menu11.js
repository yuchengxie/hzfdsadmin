module.exports = [{
    path: '/',
    name: 'home',
    label: '首页',
    icon: 's-home',
    url: 'Home/Home',
    isModule:true
  }, {
    path: '',
    name: 'userModule',
    label: '用户管理',
    icon: 'user',
    isModule:true,
    children: [{
      path: '/user',
      name: 'user',
      label: '用户列表',
      icon: 'user',
      url: 'User/User/User',
    }, {
      path: '/role',
      name: 'role',
      label: '角色列表',
      icon: 'user',
      url: 'User/Role/Role',
    }, {
      path: '/access',
      name: 'access',
      label: '权限列表',
      icon: 'user',
      url: 'User/Access/Access',
    }, {
      path: '/accessAdd',
      name: 'accessAdd',
      label: '增加权限列表',
      url: 'User/Access/Add',
      isOperate: true //操作
    }]
  }, {
    path: '/focus',
    name: 'focus',
    label: '轮播图管理页',
    icon: 'picture',
    url: 'Focus/Focus',
    isModule:true,
  },
  {
    path: '',
    name: 'goodsModule',
    label: '商品管理',
    icon: 's-shop',
    isModule:true,
    children: [{
        path: '/goods',
        name: 'goods',
        icon: 'picture',
        label: '商品列表',
        url: 'Goods/Goods/Goods',
      },
      {
        path: '/goods/add',
        name: 'goodsAdd',
        label: '增加商品列表',
        url: 'Goods/Goods/Add',
        icon: 'picture',
        isOperate: true //操作
      },
      {
        path: '/goodsCate',
        name: 'goodsCate',
        label: '商品分类',
        icon: 'video-camera-solid',
        url: 'Goods/Cate/Cate',
      },
      {
        path: '/goodsCate/add',
        name: 'goodsCateAdd',
        label: '增加商品分类',
        url: 'Goods/Cate/Add',
        icon: 'picture',
        isOperate: true //操作
      },
      {
        path: '/goodsType',
        name: 'goodsType',
        label: '商品类型',
        icon: 'video-camera-solid',
        url: 'Goods/Type/Type'
      },
      {
        path: '/goodsType/add',
        name: 'goodsTypeAdd',
        label: '增加商品类型',
        url: 'Goods/Type/Add',
        isOperate: true //操作
      },
      {
        path: '/goodsTypeAttr',
        name: 'goodsTypeAttr',
        label: '商品类型属性',
        url: 'Goods/TypeAttr/TypeAttr',
        isOperate: true //操作
      },
      {
        path: '/goodsTypeAttrAdd',
        name: 'goodsTypeAttrAdd',
        label: '增加商品类型属性',
        url: 'Goods/TypeAttr/Add',
        icon: 'picture',
        isOperate: true //操作
      },
    ]
  },
  {
    path: '',
    name: 'settingModule',
    label: '设置',
    icon: 'setting',
    isModule:true,
    children: [{
      path: '/menu',
      name: 'menu',
      label: '设置菜单',
      icon: 'files',
      url: 'Setting/Menu'
    }, {
      path: '/page2',
      name: 'page2',
      label: '页面二',
      icon: 's-home',
      url: 'Setting/PageTwo'
    }]
  }
]