<template>
  <div class="file">
    <input
      @change="({ target }) => getImage(target as EventTarget)"
      type="file"
    />

    <div :class="['file__preview', `-${type}`]" v-if="imagePreview">
      <img :src="imagePreview" alt="Prévia da imagem" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    type: 'hero' | 'thumbnail'
  }

  defineProps<Props>()

  const emit = defineEmits(['changeFile'])

  const imagePreview = ref('')

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
    &__preview {
      &.-hero {
        height: 460px;
      }

      &.-thumbnail {
        height: 200px;
      }
    }
  }
</style>
