import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import store from '@/store';
import getMenuRoutes from '@/util/permission';

Vue.use(VueRouter);

const ayncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品',
      icon: 'inbox',
      hidden: false
    },
    component: Home,
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          hidden: false
        },
        component: () => import('@/views/page/productList.vue')
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
          hidden: false
        },
        component: () => import('@/views/page/productAdd.vue')
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'file-add',
          hidden: true
        },
        component: () => import('@/views/page/productAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          icon: 'project',
          hidden: false
        },
        component: () => import('@/views/page/category.vue'),
      }
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'number',
          hidden: false
        },
        component: () => import('../views/page/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true
    },
    component: Login,
  },
  {
    path: '/registor',
    name: 'Registor',
    meta: {
      title: '注册',
      hidden: true
    },
    component: () => import('../views/layout/components/registor'),
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: {
      title: '忘记密码？',
      hidden: true
    },
    component: () => import('../views/layout/components/forget'),
  },

];


const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {  // 进入网页时判断是否是登录页面
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) { // 若存在登陆状态，则不需要跳转至登录页面
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        })
        isAddRoutes = true;
      }
      return next()
    }
    else if (to.path == '/forget' || to.path == '/registor') {  //在没有登录的状态下可以跳转至忘记密码和注册页面
      return next()
    }
    return next('/login')
  }
  return next();
})

export default router;
