<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleClick" :is-active="sidebar.opened" />
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <screenfull class="right-menu-item hover-effect"></screenfull>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"

const store = useAppStore()
const { sidebar } = storeToRefs(store)
const toggleClick = () => {
  store.toggleSidebar()
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
  }
}
</style>
