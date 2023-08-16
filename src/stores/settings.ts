import variables from "@/styles/variables.module.scss"

import { defineStore } from "pinia"

export const useSettingsStore = defineStore(
  "settings",
  () => {
    // theme是用户选择的主题
    const settings = reactive({ theme: variables.theme, originalTheme: "" })

    type ISettings = typeof settings
    type ValueOf<T> = T[keyof T]

    //修改设置
    const changeSetting = ({
      key,
      value
    }: {
      key: keyof ISettings
      value: ValueOf<ISettings>
    }) => {
      settings[key] = value
    }

    return { settings, changeSetting }
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["settings.theme"]
    }
  }
)
