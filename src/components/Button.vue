<template>
  <button v-if="!asLink" class="button">
    <Text as="span" type="text-18" variant="bold" color="white">
      <slot />
    </Text>
  </button>

  <RouterLink v-else :to="to!" class="button">
    <Text as="span" type="text-18" variant="bold" color="white">
      <slot />
    </Text>
  </RouterLink>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  import Text from '@/components/Text.vue'

  interface Props {
    asLink?: boolean
    to?: string
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped>
  .button {
    background: $color-cherry;
    border-radius: $radius-20;
    white-space: nowrap;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    opacity: $opacity-80;
    transition: $transition-default;

    &:hover {
      opacity: $opacity-100;
    }
  }
</style>
