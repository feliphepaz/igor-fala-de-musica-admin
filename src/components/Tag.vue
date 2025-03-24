<template>
  <button type="button" class="tag">
    <Text as="span" type="text-14" variant="bold" color="cherry">
      Punk Rock
    </Text>
  </button>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'
</script>

<style lang="scss" scoped>
  .tag {
    padding: 10px 14px;
    background: $color-igor;
    border-radius: $radius-20;
    transition: $transition-default;
    border: none;
    cursor: pointer;
    outline: none;
    text-align: center;

    @include mobile {
      padding: 10px;
    }

    &:hover {
      background: $color-cherry;

      .text {
        color: $color-white;
      }
    }
  }
</style>
