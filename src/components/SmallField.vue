<template>
  <div class="small-field">
    <label :for="name">
      <Text
        v-if="variation === 'big-label'"
        as="span"
        type="text-18"
        color="black"
      >
        <slot />
      </Text>
      <Text v-else as="span" type="text-16" color="black"><slot /></Text>
    </label>

    <input :id="name" type="text" :placeholder="placeholder" v-model="value" />
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'

  interface Props {
    name?: string
    placeholder: string
    variation?: 'big-label' | 'default'
  }

  const { variation = 'default' } = defineProps<Props>()

  const value = defineModel()
</script>

<style lang="scss" scoped>
  .small-field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    input {
      width: 100%;
      outline: none;
      border: 1px solid $color-igor;
      border-radius: $radius-10;
      padding: 10px;
      font-family: $font-sans;
      font-weight: $weight-regular;
      font-size: 16px;
      line-height: 120%;

      &::placeholder {
        color: $color-black;
        opacity: $opacity-20;
      }
    }
  }
</style>
