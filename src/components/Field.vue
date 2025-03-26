<template>
  <div class="field">
    <label :for="name">
      <Text as="span" type="text-18" color="black"><slot /></Text>
    </label>

    <textarea
      :class="['field__textarea', `-${type}`]"
      type="text"
      :id="name"
      :placeholder="placeholder"
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'
  import type { ModelRef } from 'vue'

  interface Props {
    name: string
    placeholder: string
    type: 'title' | 'subtitle'
  }

  const { type } = defineProps<Props>()

  const value: ModelRef<string | undefined> = defineModel()
</script>

<style lang="scss" scoped>
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__textarea {
      border: $border-dashed;
      outline: none;
      border-radius: $radius-10;
      padding: 14px;
      resize: vertical;
      min-height: 80px;
      max-height: 200px;
      background: $color-white;
      font-family: $font-serif;

      &.-title {
        font-weight: $weight-bold;
        font-size: 40px;
        line-height: 120%;
      }

      &.-subtitle {
        font-weight: $weight-regular;
        font-size: 18px;
        line-height: 140%;
      }

      &::placeholder {
        color: $color-black;
        opacity: $opacity-20;
      }
    }
  }
</style>
