<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="admin-logo">
        <img class="logo" src="../../assets/vue.svg" alt="logo" />
        <h1 class="name">Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名">
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-class="user"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          autocomplete="on"
          show-password
        >
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        :loading="loading"
        @click="handleLogin"
        >Login</el-button
      >
    </el-form>
  </div>
</template>
<script lang="ts" setup>
const loading = ref(false)
const handleLogin = () => {
  console.log("login")
}
</script>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
.login-container {
  .el-form-item {
    .el-input {
      height: 40px;
    }
  }
}
</style>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 140px 35px 0;
    overflow: hidden;
    box-sizing: border-box;
    .admin-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      .logo {
        width: 60px;
        height: 60px;
      }
      .name {
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
}
</style>
