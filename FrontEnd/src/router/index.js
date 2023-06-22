import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
      // component: () => import('../views/home/HomeView.vue')
    }, {
      path: '/sort',
      name: 'sort',
      component: () => import('../views/home/sort/SortView.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('../views/find/FindView.vue')
    }, {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart/CartView.vue')
    }, {
      path: '/createAddress',
      name: 'createAddress',
      component: () => import('../views/createAddress/CreateAddress.vue')
    }, {
      path: '/editAddress/:id',
      name: 'editAddress',
      component: () => import('../views/editAddress/EditAddress.vue')
    }, {
      path: '/pay/:id',
      name: 'pay',
      component: () => import('../views/pay/PayView.vue')
    }, {
      path: '/order',
      name: 'order',
      component: () => import('../views/order/OrderView.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/mine/MineView.vue')
    }, {
      path: '/info/:id',
      name: 'info',
      component: () => import('../views/info/InfoView.vue')
    }, {
      path: '/shop/:id',
      name: 'shop',
      component: () => import('../views/shop/ShopView.vue')
    }, {
      path: '/search',
      name: 'search',
      component: () => import('../views/search/SearchView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/LoginView.vue'),
      // 进入路由之前会执行这个函数
      beforeEnter(to, from, next) {
        // 如果是已登录状态 就不允许访问/login 且自动跳转到首页
        localStorage.getItem("token") ? next({ path: "/" }) : next()
      }
    },
  ]
})

// // 全局检查是否登录 未登录就跳转登录页面
// router.beforeEach((to, from, next) => {
//   const { isLogin } = localStorage
//   // 这里注意逻辑 不然会死循环
//   isLogin || to.path === "/login" ? next() : next("/login")
// })

export default router
