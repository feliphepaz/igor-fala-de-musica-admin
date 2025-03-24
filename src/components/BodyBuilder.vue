<template>
  <div class="body-builder">
    <div class="body-builder__blocks">
      <div
        v-if="blocks.length"
        class="body-builder__blocks__block"
        v-for="(_, index) in blocks"
        :key="index"
      >
        <button
          class="body-builder__blocks__block__delete"
          type="button"
          @click="delBlock(index)"
        >
          <CloseIcon />
        </button>

        <textarea
          class="body-builder__blocks__block__paragraph"
          id="paragraph"
        />
      </div>

      <Text
        v-else
        class="body-builder__blocks__message"
        type="text-18"
        color="black"
      >
        Que tal adicionar o seu primeiro bloco em? 🤪
      </Text>
    </div>

    <ul class="body-builder__tools">
      <li
        class="body-builder__tools__tool"
        v-for="(tool, index) in tools"
        :key="index"
      >
        <button type="button" @click="addBlock(tool.type)">
          <component :is="tool.icon" />
        </button>

        <div class="body-builder__tools__tool__tooltip">
          <Text type="text-14" variant="bold" color="black">
            {{ tool.name }}
          </Text>
          <Text type="text-14" color="black">
            {{ tool.description }}
          </Text>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import {
    NotesIcon,
    LightBulbIcon,
    CameraIcon,
    FilmIcon,
    CloseIcon,
  } from '@/assets/icons'
  import Text from '@/components/Text.vue'

  const blocks = ref<Block[]>([])

  const tools: Tool[] = [
    {
      name: 'Parágrafo',
      type: 'paragraph',
      description: 'Adiciona um bloco de parágrafo ao texto.',
      icon: NotesIcon,
    },
    {
      name: 'Destaque',
      type: 'highlight',
      description: 'Destaca ou cita uma parte da música.',
      icon: LightBulbIcon,
    },
    {
      name: 'Imagem',
      type: 'photo',
      description: 'Insere um bloco de imagem ao texto.',
      icon: CameraIcon,
    },
    {
      name: 'YouTube',
      type: 'youtube',
      description: 'Incorpora um vídeo do YouTube.',
      icon: FilmIcon,
    },
  ]

  function addBlock(type: 'paragraph' | 'highlight' | 'photo' | 'youtube') {
    blocks.value.push({
      type: type,
    })
  }

  function delBlock(index: number) {
    blocks.value.splice(index, 1)
  }
</script>

<style lang="scss" scoped>
  .body-builder {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-top: 40px;

    &__blocks {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      &__block {
        border: 1px dashed $color-igor;
        border-radius: $radius-10;
        min-height: 230px;
        padding: 14px;
        position: relative;

        &__delete {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          position: absolute;
          right: -10px;
          top: -10px;
          border: none;
          background: $color-white;
          border-radius: $radius-rounded;
          cursor: pointer;
          transition: $transition-default;

          &:hover {
            background: $color-cherry;

            :deep(svg path) {
              fill: $color-white;
            }
          }
        }

        &__paragraph {
          outline: none;
          border: none;
          background: transparent;
          resize: vertical;
          width: 100%;
          min-height: 100%;
          max-height: 400px;
          color: $color-black;
          font-family: $font-serif;
          font-weight: $weight-regular;
          font-size: 20px;
          line-height: 160%;
          letter-spacing: 0.2px;

          @include tablet {
            font-size: 18px;
          }
        }
      }

      &__message {
        text-align: center;
      }
    }

    &__tools {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &__tool {
        position: relative;

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: $color-igor;
          border-radius: $radius-10;
          width: 50px;
          height: 50px;
          cursor: pointer;
          opacity: $opacity-80;
          transition: $transition-default;

          &:hover {
            opacity: $opacity-100;
          }
        }

        &__tooltip {
          display: none;
          flex-direction: column;
          width: 170px;
          gap: 6px;
          position: absolute;
          top: -80px;
          left: -140px;
          background: $color-white;
          padding: 16px;
          border-radius: $radius-10;
          box-shadow: $shadow;

          &::after {
            content: '';
            position: absolute;
            top: 100%;
            right: 10px;
            border-top: 6px solid $color-white;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
          }
        }

        &:hover {
          .body-builder__tools__tool__tooltip {
            display: flex;
          }
        }
      }
    }
  }
</style>
