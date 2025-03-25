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

    <div class="file__preview" v-if="imagePreview">
      <img :class="`-${type}`" :src="imagePreview" alt="Prévia da imagem" />
    </div>

    <div class="file__texts" v-if="type === 'photo' && imagePreview">
      <SmallField
        :name="`copyright-${Math.floor(Math.random() * 100)}`"
        placeholder="Exemplo: Foto por David McClister."
      >
        Crédito
      </SmallField>

      <SmallField
        :name="`description-${Math.floor(Math.random() * 100)}`"
        placeholder="Exemplo: Brittany Howard junto com a sua banda Alabama Shakes."
      >
        Descrição
      </SmallField>

      <Text class="file__texts__recommendation" type="text-14" color="white">
        Ambos são opcionais. Mas os créditos são bons para dar aquela moral pro
        autor e a descrição melhora a acessibilidade do site.
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Text from '@/components/Text.vue'
  import SmallField from './SmallField.vue'

  interface Props {
    type?: 'hero' | 'thumbnail' | 'photo'
  }

  const { type = 'photo' } = defineProps<Props>()

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
      display: flex;
      justify-content: center;

      img {
        &.-hero {
          height: 460px;
        }

        &.-thumbnail {
          width: 393.33px;
          height: 200px;
        }

        &.-photo {
          width: 800px;
          height: 460px;
        }
      }
    }

    &__texts {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &__recommendation {
        background: $color-cherry;
        opacity: $opacity-60;
        padding: 10px;
      }
    }
  }
</style>
