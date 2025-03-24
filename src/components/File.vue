<template>
  <div class="file">
    <div class="file__field">
      <input
        class="file__field__button"
        @change="({ target }) => getImage(target as EventTarget)"
        type="file"
      />

      <Text class="file__field__recommendation" type="text-14" color="white">
        Recomendação de tamanho: {{ recommendedSize }}
      </Text>
    </div>

    <div :class="['file__preview', `-${type}`]" v-if="imagePreview">
      <img :src="imagePreview" alt="Prévia da imagem" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Text from '@/components/Text.vue'

  interface Props {
    type: 'hero' | 'thumbnail' | 'photo'
  }

  const { type } = defineProps<Props>()

  const emit = defineEmits(['changeFile'])

  const imagePreview = ref('')

  const recommendedSize = computed(() => {
    if (type === 'hero') return '1920 x 1240px'
    if (type === 'thumbnail') return '640 x 360px'
    return '800 x 460px'
  })

  function getImage(target: EventTarget) {
    const file = (target as HTMLInputElement).files?.[0]
    const reader = new FileReader()

    reader.onload = () => {
      imagePreview.value = reader.result as string
    }

    if (file) reader.readAsDataURL(file)

    emit('changeFile', file)
  }
</script>

<style lang="scss" scoped>
  .file {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__field {
      display: flex;
      flex-direction: column;
      gap: 14px;

      &__button {
        &::file-selector-button {
          background: transparent;
          border-radius: $radius-20;
          padding: 10px 20px;
          border: $border-dashed;
          cursor: pointer;
          transition: $transition-default;
          font-family: $font-sans;
          font-weight: $weight-regular;
          font-size: 18px;
          font-weight: $weight-bold;
          color: $color-cherry;
          margin-right: 20px;

          &:hover {
            background: $color-white;
          }
        }
      }

      &__recommendation {
        background: $color-cherry;
        opacity: $opacity-60;
        padding: 10px;
      }
    }

    &__preview {
      &.-hero {
        height: 460px;
      }

      &.-thumbnail {
        width: 393.33px;
        height: 200px;
      }
    }
  }
</style>
