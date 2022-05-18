import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../components/main/main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/Login.vue')
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
    path: '/salary',
    name: 'salary',
    component: Main,
    redirect: '/salaryManage',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/salaryManage',
        name: 'salaryManage',
        component: () => import('../views/salary/index.vue'),
        meta: {
          title: '工资'
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
  {
    path: '/settings',
    name: 'settings',
    component: Main,
    redirect: '/set',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/set',
        name: 'set',
        component: () => import('../views/settings/index.vue'),
        meta: {
          title: '设置'
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