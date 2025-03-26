<template>
  <div class="highlight">
    <div class="highlight__content">
      <div class="highlight__content__verses">
        <input
          v-for="(_, index) in verses"
          :key="index"
          class="highlight__content__verses__verse"
          type="text"
          v-model="verses[index]"
        />

        <button
          class="highlight__content__verses__add"
          type="button"
          @click="addVerse"
        >
          +
        </button>
      </div>
    </div>

    <div class="highlight__author">
      <SmallField placeholder="Título da música" v-model="music">
        Música
      </SmallField>
      <SmallField placeholder="Nome da banda ou autor(a)" v-model="band">
        Banda
      </SmallField>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import SmallField from '@/components/SmallField.vue'

  interface Props {
    initialVerses?: string[]
    initialMusic?: string
    initialBand?: string
  }

  const {
    initialVerses = [],
    initialMusic = '',
    initialBand = '',
  } = defineProps<Props>()

  const verses = ref(initialVerses)
  const music = ref(initialMusic)
  const band = ref(initialBand)

  const emit = defineEmits(['changeHighlight'])

  watch(
    [verses, music, band],
    ([newVerses, newMusic, newBand]) => {
      emit('changeHighlight', {
        verses: newVerses,
        music: newMusic,
        band: newBand,
      })
    },
    { immediate: true },
  )

  function addVerse() {
    verses.value.push('')
  }
</script>

<style lang="scss" scoped>
  .highlight {
    display: flex;
    flex-direction: column;
    gap: 14px;

    &__content {
      display: flex;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: $color-black;
        opacity: $opacity-20;
      }

      &__verses {
        margin-left: 20px;
        width: 100%;

        &__verse {
          outline: none;
          border: none;
          background: transparent;
          width: 100%;
          padding: 0;
          color: $color-black;
          font-family: $font-serif;
          font-weight: $weight-regular;
          font-size: 20px;
          line-height: 160%;
          letter-spacing: 0.2px;
        }

        &__add {
          margin-top: 4px;
          background: $color-igor;
          border: none;
          outline: none;
          width: 35px;
          cursor: pointer;
          border-radius: $radius-10;
          font-family: $font-sans;
          font-weight: $weight-bold;
          font-size: 20px;
          color: $color-white;
          transition: $transition-default;

          &:hover {
            background: $color-cherry;
          }
        }
      }
    }

    &__author {
      display: flex;
      gap: 10px;
    }
  }
</style>
