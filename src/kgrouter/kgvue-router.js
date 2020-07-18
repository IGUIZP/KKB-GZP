let KGVue;

class KGVueRouter {
  constructor(options) {
    this.$options = options
    // this.current = '/'
    // const initstall = window.location.hash.slice(1) || '/'
    // KGVue.util.defineReactive(this, 'current', initstall)
    this.current = window.location.hash.slice(1) || '/'
    KGVue.util.defineReactive(this, 'matched', [])
    this.match()

    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
    // this.routeMap = {}
    // this.$options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // });
  }

  match (routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
    console.log(this.current)
    this.matched = []
    this.match()
  }
}
KGVueRouter.install = function (Vue) {
  KGVue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render (h) {
      return h('a', {
        attrs: {
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })

  Vue.component('router-view', {
    render (h) {
      let depth = 0
      this.$vnode.data.routerView = true
      let parent = this.$parent
      while (parent) {
        const parentDate = parent.$vnode && parent.$vnode.data
        if (parentDate && parentDate.routerView) {
          depth++
        }

        parent = parent.$parent
      }

      // const current = this.$router.current
      // const comp = this.$router.routeMap[current] ? this.$router.routeMap[current].component : null
      let comp = null
      const route = this.$router.matched[ depth ]
      if (route) {
        comp = route.component
      }
      console.log('router-view')
      return h(comp)
    }
  })
}
console.log(KGVue)
export default KGVueRouter
