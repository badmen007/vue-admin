import { defineStore } from "pinia"
import { login as loginApi } from "@/api/user"
import { removeToken, setToken } from "@/utils/auth"

export interface IUserInfo {
  username: string
  password: string
}

import { useTagsView } from "./tagsView"

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    token: ""
  })

  const login = async (userInfo: IUserInfo) => {
    try {
      const { username, password } = userInfo
      const response = await loginApi({ username: username.trim(), password })
      const { data } = response
      state.token = data.token
      setToken(data.token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const { delAllView } = useTagsView()
  const logout = () => {
    // 清空store中的token
    state.token = ""
    // 清空localStorage中的token
    removeToken()
    // 清除所有tag views
    delAllView()
  }

  const resetToken = () => {
    state.token = ""
    removeToken()
  }

  return { state, login, logout, resetToken }
})
