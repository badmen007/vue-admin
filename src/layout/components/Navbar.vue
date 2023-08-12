<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleClick" :is-active="sidebar.opened" />
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
  height: 50px;
}
</style>
