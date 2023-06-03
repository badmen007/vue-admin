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

const app = createApp(App)
app.use(ElementPlus)

app.use(router)
app.use(createPinia())
app.mount('#app')
