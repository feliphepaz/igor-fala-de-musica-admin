<template>
  <div class="body-builder">
    <div class="body-builder__choice">
      <button class="body-builder__choice__delete" type="button">
        <CloseIcon />
      </button>
      <textarea class="body-builder__choice__paragraph" id="paragraph" />
    </div>

    <ul class="body-builder__tools">
      <li
        class="body-builder__tools__tool"
        v-for="(tool, index) in tools"
        :key="index"
      >
        <button type="button">
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
  import {
    NotesIcon,
    LightBulbIcon,
    CameraIcon,
    FilmIcon,
    CloseIcon,
  } from '@/assets/icons'
  import Text from '@/components/Text.vue'

  const tools = [
    {
      name: 'Parágrafo',
      description: 'Adiciona um bloco de parágrafo ao texto.',
      icon: NotesIcon,
    },
    {
      name: 'Destaque',
      description: 'Destaca ou cita uma parte da música.',
      icon: LightBulbIcon,
    },
    {
      name: 'Imagem',
      description: 'Insere um bloco de imagem ao texto.',
      icon: CameraIcon,
    },
    {
      name: 'YouTube',
      description: 'Incorpora um vídeo do YouTube.',
      icon: FilmIcon,
    },
  ]
</script>

<style lang="scss" scoped>
  .body-builder {
    display: flex;
    justify-content: space-between;
    gap: 40px;
    margin-top: 40px;

    &__choice {
      width: 100%;
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
        width: 100%;
        border: 1px dashed $color-igor;
        resize: vertical;
        min-height: 230px;
        max-height: 400px;
        color: $color-black;
        font-family: $font-serif;
        font-weight: $weight-regular;
        border-radius: $radius-10;
        padding: 14px;
        background: transparent;
        font-size: 20px;
        line-height: 160%;
        letter-spacing: 0.2px;

        @include tablet {
          font-size: 18px;
        }
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
