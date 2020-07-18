let KGVue;

class Store {
  constructor(options) {
    this.$options = options
    this.getters = {}
    this._mutations = options.mutations
    this._actions = options.actions
    const store = this
    const { commit, dispatch } = store
    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    const computed = {}
    Object.keys(options.getters).forEach(getter => {
      computed[getter] = () => options.getters[getter](this.state)
      Object.defineProperty(this.getters, getter, {
        get: () => this._vm[getter]
      })
    })
    this._vm = new KGVue({
      data: {
        $$state: options.state
      },
      computed
    })
  }

  get state () {
    return this._vm._data.$$state
  }
  set state (val) {
    console.error('please set state try using dispatch');
  }

  commit(type, payload) {
    const fn = this._mutations[type]
    if (!fn) {
      console.error('unknow mutations type');
      return
    }
    fn(this.state, payload)
  }

  dispatch(type, payload) {
    const fn = this._actions[type]
    if (!fn) {
      console.error('unknow mutations type');
      return
    }
    return fn(this, payload)
  }

}

const install = function (Vue) {
  KGVue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) Vue.prototype.$store = this.$options.store
    }
  })
}

export default { Store, install }