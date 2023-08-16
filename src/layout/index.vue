<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view v-if="showTagsView"></tags-view>
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
import { useSettingsStore } from "@/stores/settings"

const showSetting = ref(false)

const openSetting = () => {
  showSetting.value = true
}

const settingsPanelWidth = computed(() => variables.settingPanelWidth)

const settingStore = useSettingsStore()
const showTagsView = computed(() => settingStore.settings.tagsView)
const otherHeight = computed(() => (showSetting.value ? 84 : 50) + "px")
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
      min-height: calc(100vh - v-bind(otherHeight));
      background: red;
    }
  }
}
</style>
