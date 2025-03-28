<template>
  <div class="review">
    <div class="review__album">
      <div class="review__album__search">
        <label>
          <Text as="span" type="text-18" color="black">Pesquisar álbum</Text>
        </label>

        <div class="review__album__search__field">
          <input
            class="review__album__search__field__input"
            type="text"
            id="album"
            placeholder="Pesquise um álbum"
            v-model="albumSearched"
            @keyup.enter="searchAlbum"
          />

          <button
            class="review__album__search__field__submit"
            type="button"
            @click="searchAlbum"
          >
            Pesquisar
          </button>
        </div>
      </div>

      <div class="review__album__albums" v-show="albums.length">
        <Select
          name="albums"
          :options="albums"
          @change-select="(select) => (selectedAlbum = select)"
        >
          Álbuns encontrados
        </Select>
      </div>

      <div class="review__album__year" v-show="albums.length">
        <SmallField
          name="year"
          placeholder="Digite o ano de lançamento"
          v-model="year"
          big-label
        >
          Ano do álbum
        </SmallField>
      </div>
    </div>

    <ReviewCard
      v-if="selectedAlbum"
      :album="albums[selectedAlbum].name"
      :band="albums[selectedAlbum].artist"
      :cover="
        albums[selectedAlbum].image.find(
          (image) => image.size === 'extralarge',
        )?.['#text']
      "
      :year="year"
      @change-review-card="
        (scoreCard, ratingTextCard) => {
          score = scoreCard
          ratingText = ratingTextCard
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  import Text from '@/components/Text.vue'
  import Select from '@/components/Select.vue'
  import SmallField from '@/components/SmallField.vue'
  import ReviewCard from '@/components/ReviewCard.vue'
  import Swal from 'sweetalert2'

  const albumSearched = ref('')
  const albums = ref<Album[]>([])
  const selectedAlbum = ref<number | null>(null)
  const year = ref('')
  const score = ref('')
  const ratingText = ref('')

  const emit = defineEmits(['changeReview'])

  watch(
    [selectedAlbum, year, score, ratingText],
    ([newSelectedAlbum, newYear, newScore, newRatingText]) => {
      const album = albums.value[newSelectedAlbum as number]

      emit('changeReview', {
        album: {
          cover: album.image.find((image) => image.size === 'extralarge')?.[
            '#text'
          ],
          year: newYear,
          name: album.name,
          artist: album.artist,
        },
        review: {
          score: newScore,
          ratingText: newRatingText,
        },
      })
    },
  )

  async function searchAlbum() {
    try {
      if (albumSearched.value === '') throw new Error('Empty field')
      Swal.fire({
        title: 'Pesquisando',
        text: 'Aguarde uns segundinhos.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${albumSearched.value}&api_key=${import.meta.env.VITE_API_KEY}&limit=30&format=json`,
      )
      const resolve = await response.json()
      albums.value = resolve.results.albummatches.album
      Swal.close()
    } catch (error: any) {
      if (error.message === 'Empty field') {
        Swal.fire({
          title: 'Erro!',
          text: 'O campo de busca não pode estar vazio.',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Houve algum erro durante a busca. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .review {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__album {
      display: flex;
      align-items: flex-start;
      gap: 40px;

      &__search {
        display: flex;
        flex-direction: column;
        width: 33.33%;
        gap: 6px;

        &__field {
          display: flex;

          &__input {
            width: 100%;
            outline: none;
            border: 1px solid $color-igor;
            border-radius: $radius-10 0 0 $radius-10;
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

          &__submit {
            background: $color-igor;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 0 $radius-10 $radius-10 0;
            padding: 0 10px;
            font-family: $font-sans;
            font-weight: $weight-bold;
            font-size: 14px;
            line-height: 120%;
            letter-spacing: 0.2px;
            color: $color-white;
            transition: $transition-default;

            &:hover {
              background: $color-cherry;
            }
          }
        }
      }

      &__albums,
      &__year {
        width: 33.33%;
      }
    }
  }
</style>
