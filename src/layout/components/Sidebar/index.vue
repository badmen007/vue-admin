<template>
  <logo v-if="showLogo" :collapse="isCollapse" />
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="themeColor"
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
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import { useMenuStore } from "@/stores/menu"

const store = useAppStore()
const { sidebar } = storeToRefs(store)

const menuStore = useMenuStore()

const menuList = computed(() => menuStore.state.authMenuTreeData)

const menuRoutes = computed(() => menuList.value)

const route = useRoute()

//  根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  const { path, meta } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

// 获取主题色
const settingStore = useSettingsStore()
const themeColor = computed(() => settingStore.settings.theme)

const showLogo = computed(() => settingStore.settings.sidebarLogo)
// 展开收起状态 稍后放store 当前是展开就让它收起
const isCollapse = computed(() => store.sidebar.opened)
</script>
<style lang="scss" scoped></style>
