import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 初始化css样式
import 'normalize.css/normalize.css'
// 全局样式
import '@/styles/index.scss'

// 引入icon插件
import initSvgIcon from '@/icons/index.ts'
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(ElementPlus)

// 注册svg-icon组件
app.use(initSvgIcon)
app.use(router)
app.use(createPinia())
app.mount('#app')
