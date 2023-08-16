<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view></tags-view>
      </div>
      <!-- <div class="app-main">
        <h2>app main</h2>
        <router-view></router-view>
      </div> -->
      <app-main></app-main>
    </div>
  </div>
  <right-panel
    v-model="showSetting"
    title="样式风格设置"
    :size="settingsPanelWidth"
  >
    <settings />
  </right-panel>
</template>

<script lang="ts" setup>
import variables from "@/styles/variables.module.scss"

const showSetting = ref(false)

const openSetting = () => {
  showSetting.value = true
}

const settingsPanelWidth = computed(() => variables.settingPanelWidth)
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;

    .header {
      .navbar {
        height: 50px;
      }

      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }

    .app-main {
      min-height: calc(100vh - 84px);
      background: red;
    }
  }
}
</style>
