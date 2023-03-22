import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/FrontLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/front/IndexView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'carts',
        component: () => import('../views/front/CartView.vue')
      },
      {
        path: 'pay/:orderId',
        component: () => import('../views/front/PayView.vue')
      },
      {
        path: 'faq',
        component: () => import('../views/front/FaqView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/admin/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/admin/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/admin/CouponsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: 'active',
  routes,
  scrollBehavior () {
    return { top: 0 }
  }
})

export default router
