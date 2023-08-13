import { Size } from "@/plugins/element"
import { defineStore } from "pinia"
export const useAppStore = defineStore(
  "app",
  () => {
    // 状态
    const state = reactive({
      sidebar: {
        opened: true
      },
      size: "default"
    })
    const sidebar = computed(() => state.sidebar)
    const size = computed(() => state.size)

    const setSize = (size: Size) => {
      state.size = size
    }
    //actions
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    return { state, sidebar, toggleSidebar, size, setSize }
  },
  {
    // 持久化
    persist: {
      storage: window.sessionStorage,
      paths: ["state.sidebar.opened", "state.size"]
    }
  }
)
