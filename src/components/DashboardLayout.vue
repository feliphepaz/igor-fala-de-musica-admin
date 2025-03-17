<template>
  <main class="dashboard-layout">
    <Nav />
    <slot />
  </main>
</template>

<script setup lang="ts">
  import Nav from '@/components/Nav.vue'
</script>

<style lang="scss" scoped>
  .dashboard-layout {
    display: flex;
    height: 100vh;
  }
</style>
