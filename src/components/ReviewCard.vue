<template>
  <div class="review-card">
    <div class="review-card__data">
      <img class="review-card__data__cover" :src="cover" :alt="album" />

      <div class="review-card__data__info">
        <Text
          v-if="year"
          class="review-card__data__info__year"
          as="span"
          type="caption"
          variant="bold"
          color="black"
        >
          {{ year }}
        </Text>
        <Text as="h4" type="title-h1" color="black">{{ album }}</Text>
        <Text as="h5" type="title" color="black">{{ band }}</Text>
      </div>
    </div>

    <div class="review-card__rating">
      <div class="review-card__rating__score">
        <input
          :disabled="disableChangeScore"
          type="text"
          v-model="score"
          @input="(e) => maskScore(e)"
        />
      </div>

      <Text class="review-card__rating__text" type="title" color="cherry">
        {{ ratingText }}
      </Text>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import Text from '@/components/Text.vue'

  interface Props {
    album: string
    band: string
    year?: string
    cover?: string
    disableChangeScore?: boolean
  }

  defineProps<Props>()

  const score = defineModel('score', {
    default: '5.0',
  })

  const emit = defineEmits(['changeReviewCard'])

  const scoreRef = ref(score)

  const ratingText = computed(() => {
    const scoreToNumber = +scoreRef.value

    if (scoreToNumber >= 10) return 'Obra-prima 🔥'
    if (scoreToNumber >= 8.5) return 'Ótimo!'
    if (scoreToNumber >= 7 && scoreToNumber < 8.5) return 'Bom'
    if (scoreToNumber >= 6 && scoreToNumber < 7) return 'Médio'
    if (scoreToNumber < 4 && scoreToNumber >= 2) return 'Ruim'
    if (scoreToNumber < 2) return 'Uma merda 💩'
    return 'Não fede nem cheira'
  })

  watch(
    [score, ratingText],
    ([newScore, newRatingText]) => {
      emit('changeReviewCard', newScore, newRatingText)
    },
    { immediate: true },
  )

  function maskScore(e: Event) {
    let value = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '')
    const [integer, decimal] = value.split('.')

    if (integer.length > 2) {
      value = integer.slice(0, 2)
    }

    if (decimal) {
      value = `${value.split('.')[0]}.${decimal.slice(0, 1)}`
    }

    score.value = value
  }
</script>

<style lang="scss" scoped>
  .review-card {
    display: flex;
    justify-content: space-between;
    gap: 80px;
    padding: 40px;
    max-width: 700px;
    background: linear-gradient($left-to-right, $color-igor, $color-queen);

    @include mobile {
      flex-direction: column;
      align-items: center;
      gap: 20px;
      max-width: 100%;
      background: linear-gradient($top-to-bottom, $color-igor, $color-queen);
    }

    &__data {
      display: flex;
      gap: 20px;

      @include mobile {
        flex-direction: column;
        gap: 10px;
      }

      &__cover {
        width: 200px;
        height: 200px;
      }

      &__info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        &__year {
          opacity: $opacity-40;
        }
      }
    }

    &__rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      &__score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120px;
        height: 120px;
        border: 4px solid $color-cherry;
        border-radius: $radius-rounded;

        input {
          border: none;
          background: transparent;
          padding: 0;
          width: 80px;
          height: 80px;
          outline: none;
          text-align: center;
          font-family: $font-serif;
          font-weight: $weight-bold;
          font-size: 40px;
          line-height: 120%;
          color: $color-cherry;
        }

        @include tablet {
          width: 100px;
          height: 100px;
        }
      }

      &__text {
        text-align: center;
      }
    }
  }
</style>
