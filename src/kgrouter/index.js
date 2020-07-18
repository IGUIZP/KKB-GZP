import Vue from 'vue'
import VueRouter from './kgvue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: '/detail',
        name: 'detail',
        component: {render(h) { return h('div', 'this is a detail page')}}// () => ('<div>this is a detail page</div>')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
