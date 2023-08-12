import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

// 自动导入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import ElementPlus from "unplugin-element-plus/vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    // svg相关配置
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[name]", // symbol的id名称
      inject: "body-last", // 插入的位置
      customDomId: "__svg__icons__dom__" // svg的id
    }),
    // 自动导入
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false },
      dts: "src/auto-imports.d.ts" // 生成的全局变量放到这个目录下
    }),
    Components({
      // 默认值针对src/components目录
      dirs: ["src/components", "src/layout/components"], // 布局相关的组件也想自动导入
      dts: "src/components.d.ts", // 生成的全局变量放到这个目录下
      resolvers: [ElementPlusResolver()]
    }),
    // element-plus
    ElementPlus({})
  ]
})
