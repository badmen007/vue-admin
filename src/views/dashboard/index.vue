<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon
      icon-class="404"
      class-name="custom-class"
      @click="sayHi"
    ></svg-icon>
    <br />
    <br />
    缓存测试 <input type="text" />
    <el-button>点击</el-button>
  </div>
</template>

<script setup lang="ts">
// import { getCurrentInstance } from "vue"
defineOptions({ name: "Dashboard" })
const { proxy } = getCurrentInstance()!
const sayHi = () => {
  proxy?.$message.success("恭喜你，这是一条成功的消息")
}
</script>

<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>
