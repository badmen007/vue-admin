import { createApp } from "vue"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import permissionDirective from "./directive/permission/index"

// 重置样式
import "normalize.css/normalize.css"

// 全局样式
import "@/styles/index.scss"

import "virtual:svg-icons-register"

import App from "./App.vue"
import router from "./router"
import initSvgIcon from "@/icons/index"

import installElementPlus from "./plugins/element"
import "./permission"

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(installElementPlus)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(initSvgIcon)
// 注册权限指令
app.use(permissionDirective)

app.mount("#app")
