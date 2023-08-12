<template>
  <component :is="type" v-bind="linkPorps">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { isExternal } from "@/utils/validate"

// 如果是外部链接的话，就渲染成a标签
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

// 判断接受的路径是不是外部链接
const isExt = computed(() => isExternal(props.to))

const type = computed(() => {
  if (isExt.value) {
    return "a"
  }
  return "router-link"
})

const linkPorps = computed(() => {
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener"
    }
  }
  return {
    to: props.to
  }
})
</script>
