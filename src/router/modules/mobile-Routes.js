export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/photo/:id',
    name: 'photo',
    component: () => import('@/components/pins/index.vue')
  }
]
