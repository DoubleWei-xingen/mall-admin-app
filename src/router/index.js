import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getRouters from '@/utils/permission';
import Home from '../views/layout/Home.vue';

Vue.use(VueRouter);

const mapRouter = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    redirect: {
      name: 'ProductList',
    },
    meta: {
      title: '商品',
      icon: 'shopping',
      hidden: false,
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          icon: 'unordered-list',
          hidden: false,
        },
        component: () => import(/* webpackChunkName : "list") */ '../views/page/ProductList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'edit',
          hidden: false,
        },
        component: () => import(/* webpackChunkName : "add" */ '../views/page/ProductAdd.vue'),
      },
      {
        path: 'edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          icon: 'edit',
          hidden: true,
        },
        component: () => import(/* webpackChunkName : "add" */ '../views/page/ProductAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          icon: 'form',
          hidden: false,
        },
        component: () => import(/* webpackChunkName: "catergory" */ '../views/page/CateGory.vue'),
      },
    ],
  },
];

const routes = [
  {
    path: '/',
    redirect: '/system',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    // redirect: '/home/index',
    redirect: {
      name: 'Index',
    },
    component: Home,
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
      // requestLogin: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: {
          title: '统计',
          icon: 'area-chart',
          hidden: false,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName : "index") */ '../views/page/Index.vue'),
      },
    ],
  },
  {
    path: '/system',
    name: 'System',
    meta: {
      hidden: true,
    },
    component: () => import(/* webpackChunkName : "logon") */ '../views/page/SystemFace.vue'),
  },
  {
    path: '/logon',
    name: 'Logon',
    meta: {
      hidden: true,
    },
    component: () => import(/* webpackChunkName : "logon") */ '../views/page/Logon.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
    },
    component: () => import(/* webpackChunkName : "login") */ '../views/page/Login.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// router.$addRoutes = (params) => {
//   router.matcher = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes: [...routes],
//   }).matcher;
//   router.addRoutes(params);
// };

let isaddRouters = false;
router.beforeEach((to, from, next) => {
  // const isreLogin = to.matched.some((item) => item.meta.requestLogin);
  if (to.path === '/system') {
    return next();
  } if (to.path === '/logon') {
    return next();
  } if (to.path === '/login') {
    return next();
  } if (to.redirectedFrom === '/home' || to.fullPath.indexOf('/Product')) {
    if (store.state.user.username && store.state.user.appkey
      && store.state.user.role && store.state.user.email) {
      if (!isaddRouters) {
        const menuRoutes = getRouters(store.state.user.role, mapRouter);
        console.log(menuRoutes);// 右侧导航数据
        store.dispatch('changemenuRouters', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          console.log(routes);// 总路由；
          next();
        });
        isaddRouters = true;// 解决路由重复注册的问题
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
