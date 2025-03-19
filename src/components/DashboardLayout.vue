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

    :deep(main) {
      width: calc(100% - 300px);
    }
  }
</style>
