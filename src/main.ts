import { createApp } from "vue"
import { createPinia } from "pinia"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

// 重置样式
import "normalize.css/normalize.css"

// 全局样式
import "@/styles/index.scss"

import "virtual:svg-icons-register"

import App from "./App.vue"
import router from "./router"
import initSvgIcon from "@/icons/index"

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(initSvgIcon)
app.mount("#app")
