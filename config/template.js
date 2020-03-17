module.exports = [{
    path: '/',
    name: 'home',
    label: '首页',
    icon: 's-home',
    url: 'Home/Home',
    isModule: true
  }, {
    path: '',
    name: 'user_manager',
    label: '用户管理',
    icon: 'userModule',
    isModule: true,
    children: []
  }, {
    path: '/focus',
    name: 'focus',
    label: '轮播图管理页',
    icon: 'picture',
    url: 'Focus/Focus',
    isModule: true,
  },
  {
    path: '',
    name: 'goodsModule',
    label: '商品管理',
    icon: 's-shop',
    isModule: true,
    children: []
  },
  {
    path: '',
    name: 'settingModule',
    label: '设置',
    icon: 'setting',
    isModule: true,
    children: []
  }
]