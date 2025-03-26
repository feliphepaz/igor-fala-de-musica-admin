<template>
  <button
    type="button"
    :class="['tag', { '-selected': selected }]"
    @click="select"
  >
    <Text as="span" type="text-14" variant="bold" color="cherry">
      <slot />
    </Text>
  </button>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Text from '@/components/Text.vue'

  interface Props {
    slug: string
  }

  const { slug } = defineProps<Props>()

  const selected = ref(false)

  const emit = defineEmits(['changeTag'])

  function select() {
    selected.value = !selected.value
    emit('changeTag', slug, selected.value)
  }
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

    &:hover,
    &.-selected {
      background: $color-cherry;

      .text {
        color: $color-white;
      }
    }
  }
</style>
