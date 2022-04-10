import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Main from '../components/main/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/manage',
    name: 'manage',
    component: Main,
    redirect: '/inManage',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/inManage',
        name: 'inManage',
        component: () => import('../views/manage/inManage.vue'),
        meta: {
          title: '进货订单'
        }
      },
      {
        path: '/storageManage',
        name: 'storageManage',
        component: () => import('../views/manage/storageManage.vue'),
        meta: {
          title: '库存'
        }
      },
      {
        path: '/outManage',
        name: 'outManage',
        component: () => import('../views/manage/outManage.vue'),
        meta: {
          title: '出库'
        }
      },
    ]
  },
  {
    path: '/invoiceManage',
    name: 'invoiceManage',
    component: Main,
    redirect: '/invoice',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/invoice',
        name: 'invoice',
        component: () => import('../views/invoice/invoice.vue'),
        meta: {
          title: '发票'
        }
      },
    ]
  },
  {
    path: '/forms',
    name: 'forms',
    component: Main,
    redirect: '/reportForms',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/reportForms',
        name: 'reportForms',
        component: () => import('../views/forms/reportForms.vue'),
        meta: {
          title: '报表'
        }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

let auth = sessionStorage.getItem('loginState') || 1

router.beforeEach((to, from, next) => {
  // console.log(to.meta.requiresAuth, auth);
  if (to.meta.requiresAuth && auth === 2) {
    alert("您还未登录，请先登录！")
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

// 触发同样路由时做处理
const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default router
console.log(window.location.href);