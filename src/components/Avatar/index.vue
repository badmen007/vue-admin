<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      <img :src="avatar" class="user-avatar" />
      <i class="el-icon-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="username">
          <span style="display: block" :style="{ fontWeight: '500' }"
            >用户名：{{ username }}</span
          >
        </el-dropdown-item>
        <router-link to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <router-link to="/profile/index">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import defaultAvatar from "@/assets/vue.svg"
import { useUserStore } from "@/stores/user"
const { proxy } = getCurrentInstance()!
const store = useUserStore()

const userInfo = computed(() => store.state.userInfo)
const avatar = computed(() => userInfo.value?.avatar || defaultAvatar)
const username = computed(() => userInfo.value?.username || "")
const logout = () => {
  store.logout()
  proxy?.$message.success("退出登录")
  window.location.reload()
}
</script>
<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
    }
    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
