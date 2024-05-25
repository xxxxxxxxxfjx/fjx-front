export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      }
    ]
  },
  {
    path: '/photo/:id',
    name: 'photo',
    component: () => import('@/components/pins/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/login/index.vue')
  }
]
