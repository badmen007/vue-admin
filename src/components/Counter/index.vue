<template>
  <div>
    <button @click="handleClick">计数器</button>
    <span>{{ counter.count }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const handleClick = () => {
  counter.increment()
}
</script>
