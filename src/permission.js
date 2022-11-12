import router from '@/router'
import store from '@/store'
// import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
import nProgress from 'nprogress'

const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  // console.log(store.getters.token)
  nProgress.start()
  if (store.getters.token) {
    // debugger
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        // debugger
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nProgress.done()
})
router.afterEach(() => {
  nProgress.done()
})
