<template>
  <h4 @click="isCollapse = !isCollapse">展收测试</h4>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
    :collapse="sidebar.opened"
    :collapse-transition="true"
  >
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></sidebar-item>
  </el-menu>
</template>

<script setup lang="ts">
import scssVariables from "@/styles/variables.module.scss"
import { routes } from "@/router"
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"

const store = useAppStore()
const { sidebar } = storeToRefs(store)

const route = useRoute()

//  根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  const { path, meta } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
const isCollapse = ref(false)

const menuRoutes = computed(() => routes)
</script>
