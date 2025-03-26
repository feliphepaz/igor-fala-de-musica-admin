<template>
  <div class="spotify">
    <div class="spotify__checkbox">
      <input type="checkbox" id="embed-spotify" v-model="showSpotifyWidget" />

      <label for="embed-spotify">
        <Text as="span" type="text-16" color="black">Incorporar Spotify</Text>
      </label>
    </div>

    <div class="spotify__album-id" v-if="showSpotifyWidget">
      <label>
        <Text as="span" type="text-18" color="black">ID do álbum</Text>
      </label>

      <div class="spotify__album-id__field">
        <input
          class="spotify__album-id__field__input"
          type="text"
          id="album-id"
          placeholder="Digite o ID do álbum"
          v-model="albumId"
        />

        <button
          class="spotify__album-id__field__submit"
          type="button"
          @click="generateSpotifyWidget"
        >
          Pesquisar
        </button>
      </div>
    </div>

    <iframe
      v-if="showSpotifyWidget && hasSpotifyWidget"
      style="border-radius: 12px; max-width: 800px"
      :src="iframeSrc"
      width="100%"
      height="352"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  import Text from '@/components/Text.vue'
  import Swal from 'sweetalert2'

  const showSpotifyWidget = ref(false)
  const albumId = ref('')
  const iframeSrc = ref('')
  const hasSpotifyWidget = ref(false)

  const emit = defineEmits(['changeSpotify'])

  watch([showSpotifyWidget, albumId], ([newShowSpotifyWidget, newAlbumId]) => {
    emit('changeSpotify', {
      embed: newShowSpotifyWidget,
      id: newAlbumId,
    })
  })

  function generateSpotifyWidget() {
    hasSpotifyWidget.value = false
    if (albumId.value === '') {
      return Swal.fire({
        title: 'Erro!',
        text: 'O campo de ID do álbum não pode estar vazio.',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }

    Swal.fire({
      title: 'Pesquisando',
      text: 'Aguarde uns segundinhos.',
      timer: 2000,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    if (albumId.value) {
      iframeSrc.value = `https://open.spotify.com/embed/album/${albumId.value}?utm_source=generator`
      hasSpotifyWidget.value = true
    }
  }
</script>

<style lang="scss" scoped>
  .spotify {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__checkbox {
      display: flex;
      align-items: center;
      gap: 10px;

      input {
        width: 20px;
        height: 20px;
        margin: 0;
      }
    }

    &__album-id {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 33.33%;

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
  }
</style>
