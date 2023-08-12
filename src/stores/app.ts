import { defineStore } from "pinia"
export const useAppStore = defineStore(
  "app",
  () => {
    // 状态
    const state = reactive({
      sidebar: {
        opened: true
      }
    })
    const sidebar = computed(() => state.sidebar)

    //actions
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    return { state, sidebar, toggleSidebar }
  },
  {
    // 持久化
    persist: {
      storage: window.sessionStorage,
      paths: ["state.sidebar.opened"]
    }
  }
)
