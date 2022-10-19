<script setup lang="ts">
  import { onMounted } from 'vue'
  import { $ref, $computed } from 'vue/macros'

  const plum = $ref<HTMLCanvasElement>()
  const ctx = $computed(() => plum.getContext('2d')!)

  function init() {
    ctx.strokeStyle = '#aaa5'

    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.moveTo(20, 20)
    ctx.lineTo(20, 200)
    ctx.stroke()
  }

  onMounted(() => {
    init()
  })
</script>

<template>
  <canvas ref="plum" width="200" height="200"></canvas>
</template>

<style scoped lang="scss">
  canvas {
    background-color: #fff;
  }
</style>
