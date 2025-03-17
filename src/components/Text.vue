<template>
  <component :is="as" :class="classList">
    <slot />
  </component>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'small'
    type:
      | 'title-h1'
      | 'title'
      | 'body'
      | 'subtitle'
      | 'text-18'
      | 'text-16'
      | 'text-14'
      | 'legend'
      | 'caption'
    color: 'white' | 'black' | 'queen' | 'igor' | 'cherry'
    variant?: 'italic' | 'bold' | 'underline'
  }

  const { as = 'p', type, color, variant } = defineProps<Props>()

  const classList = ['text', `-${type}`, variant && `-${variant}`]

  const textColor = computed(() => {
    switch (color) {
      case 'white':
        return '#ffffff'
      case 'black':
        return '#000000'
      case 'queen':
        return '#fce9e9'
      case 'igor':
        return '#ff91b4'
      case 'cherry':
        return '#a63247'
    }
  })
</script>

<style lang="scss" scoped>
  .text {
    transition: $transition-default;
    color: v-bind(textColor);

    &.-title-h1 {
      font-family: $font-serif;
      font-weight: $weight-bold;
      font-size: 40px;
      line-height: 120%;

      :deep(strong) {
        color: $color-cherry;
      }

      @include tablet {
        font-size: 32px;
      }
    }

    &.-title {
      font-family: $font-serif;
      font-weight: $weight-bold;
      font-size: 20px;
      line-height: 140%;
    }

    &.-body {
      font-family: $font-serif;
      font-weight: $weight-regular;
      font-size: 20px;
      line-height: 160%;
      letter-spacing: 0.2px;

      @include tablet {
        font-size: 18px;
      }

      &.-italic {
        font-style: italic;
      }

      &.-bold {
        font-weight: $weight-bold;
      }
    }

    &.-subtitle {
      font-family: $font-serif;
      font-weight: $weight-regular;
      font-size: 18px;
      line-height: 140%;
    }

    &.-text-18 {
      font-family: $font-sans;
      font-weight: $weight-regular;
      font-size: 18px;
      line-height: 120%;

      &.-bold {
        font-weight: $weight-bold;
      }
    }

    &.-text-16 {
      font-family: $font-sans;
      font-weight: $weight-regular;
      font-size: 16px;
      line-height: 120%;
    }

    &.-text-14 {
      font-family: $font-sans;
      font-weight: $weight-regular;
      font-size: 14px;
      line-height: 120%;
      letter-spacing: 0.2px;

      &.-bold {
        font-weight: $weight-bold;
      }
    }

    &.-legend {
      font-family: $font-serif;
      font-weight: $weight-regular;
      font-size: 14px;
      line-height: 120%;

      &.-underline,
      :deep(a) {
        color: inherit;
        text-decoration: underline;
      }
    }

    &.-caption {
      font-family: $font-serif;
      font-weight: $weight-regular;
      font-size: 12px;
      line-height: 120%;

      &.-bold {
        font-weight: $weight-bold;
      }
    }
  }
</style>
