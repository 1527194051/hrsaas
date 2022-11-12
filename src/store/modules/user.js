import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async  login(context, data) {
    const result = await login(data)
    // console.log(result)
    // debugger

    context.commit('setToken', result)
  },
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值

    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 将整个的个人信息设置到用户的vuex数据中

    return result // 这里为什么要返回 为后面埋下伏笔
  },
  logout(context) {
    // 删除token
    context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
    // 删除用户资料
    context.commit('removeUserInfo') // 删除用户信息
  }
}

export default {

  namespaced: true,
  state,
  mutations,
  actions
}
