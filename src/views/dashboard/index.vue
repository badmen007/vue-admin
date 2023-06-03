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
    <br />
    <el-button>按钮</el-button>
  </div>
</template>

<script setup lang="ts">
const { proxy } = getCurrentInstance()!

const sayHi = () => {
  proxy?.$message.success('这是一条成功消息')
}
</script>

<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>
