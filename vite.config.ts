import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],// icon 图标所在目录
      symbolId: 'icon-[name]', // symbol id
      inject: 'body-last', // 插入的位置
      customDomId: '__svg__icons__dom__' // svg的id
    }),
    // 自动导入
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false },
      dts: 'src/auto-imports.d.ts' // 生成全局变量放到此目录下
    }),
    Components({
      // 默认只针对src/components目录实现自动导入
      dirs: ['src/components', 'src/layout/components'], // 布局组件也期望自动导入
      resolvers: [ElementPlusResolver()] // 生成的组件类型放到这
    }),
    ElementPlus({})
  ]
})
