<template>
  <main class="edit-post">
    <div class="edit-post__wrapper dashboard-container">
      <Text as="h1" type="title-h1" color="cherry">
        Editar post #{{ $route.params.id }}
      </Text>

      <form class="edit-post__wrapper__form">
        <Field
          type="title"
          name="title"
          placeholder="Título do post"
          v-model="post.title"
        >
          Título
        </Field>

        <Field
          type="subtitle"
          name="subtitle"
          placeholder="Subtítulo do post"
          v-model="post.subtitle"
        >
          Subtítulo
        </Field>

        <div class="edit-post__wrapper__form__images">
          <div class="edit-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Hero
            </Text>

            <File
              type="hero"
              :initial-image-preview="post.images[0].file as string"
              :initial-copyright="post.images[0].copyright"
              :initial-description="post.images[0].description"
              @change-file="
                (file) => {
                  post.images[0].file = file.file
                  post.images[0].copyright = file.copyright
                  post.images[0].description = file.description
                }
              "
            />
          </div>

          <div class="edit-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Thumbnail
            </Text>

            <File
              type="thumbnail"
              :initial-image-preview="post.images[1].file as string"
              @change-file="(file) => (post.images[1].file = file.file)"
            />
          </div>
        </div>

        <div class="edit-post__wrapper__form__body">
          <div class="edit-post__wrapper__form__body__header">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Corpo
            </Text>

            <Text type="text-16" color="black">
              O construtor de post funciona semelhante a outros editores, como
              WordPress, etc. Basta selecionar uma ferramenta ao lado, e cada
              ferramenta corresponde a um bloco.
            </Text>
          </div>

          <BodyBuilder
            :initial-blocks="post.body"
            @change-body="(body) => (post.body = body)"
          />
        </div>

        <div
          v-show="post.category === 'critica'"
          class="edit-post__wrapper__form__review"
        >
          <Text class="form-title" as="h2" type="title" color="cherry">
            Crítica
          </Text>

          <Review
            @change-review="
              (review) => {
                editAlbum = true
                post.review = review
              }
            "
          />

          <ReviewCard
            style="margin-top: 20px"
            v-if="!editAlbum && post.review"
            :album="post.review.album.name"
            :band="post.review.album.artist"
            :year="post.review.album.year"
            :cover="post.review.album.cover"
            disable-change-score
          />
        </div>

        <div class="edit-post__wrapper__form__spotify">
          <Text class="form-title" as="h2" type="title" color="cherry">
            Spotify
          </Text>

          <Spotify
            v-model:embed="post.spotify.embed"
            v-model:id="post.spotify.id"
            @change-spotify="(spotify) => (post.spotify = spotify)"
          />
        </div>

        <button
          class="edit-post__wrapper__form__submit"
          @click.prevent="submit"
          type="button"
          :disabled="modifications < 3"
        >
          <Text type="title" color="cherry">Salvar!</Text>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  import Text from '@/components/Text.vue'
  import Field from '@/components/Field.vue'
  import File from '@/components/File.vue'
  import BodyBuilder from '@/components/BodyBuilder.vue'
  import Review from '@/components/Review.vue'
  import ReviewCard from '@/components/ReviewCard.vue'
  import Spotify from '@/components/Spotify.vue'
  import Swal from 'sweetalert2'

  import useImages from '@/composables/images'
  import usePosts from '@/composables/posts'

  import toSlug from '@/utils/toSlug'

  const route = useRoute()
  const router = useRouter()
  const { uploadImage } = useImages()
  const { getPost, updatePost } = usePosts()

  let postFounded: PostGetted = {
    id: 0,
    created_at: '',
    title: '',
    subtitle: '',
    slug: '',
    category: '',
    tags: null,
    images: [
      {
        type: 'hero',
        file: '',
        copyright: null,
        description: null,
      },
      {
        type: 'thumbnail',
        file: '',
      },
    ],
    body: [],
    spotify: {
      embed: false,
      id: null,
    },
    highlight: false,
  }
  const editAlbum = ref(false)
  const modifications = ref(0)
  const post = reactive<Post | PostGetted>({
    title: '',
    subtitle: '',
    category: '',
    tags: null,
    images: [
      {
        type: 'hero',
        file: null,
        copyright: null,
        description: null,
      },
      {
        type: 'thumbnail',
        file: null,
      },
    ],
    body: [],
    review: undefined,
    spotify: {
      embed: false,
      id: null,
    },
    highlight: false,
  })

  onMounted(async () => {
    postFounded = await getPost(+route.params.id)

    if (postFounded) {
      Object.assign(post, JSON.parse(JSON.stringify(postFounded)))
    } else {
      router.push('/dashboard/posts')
    }
  })

  watch(post, () => {
    modifications.value++
  })

  async function submit() {
    try {
      Swal.fire({
        title: 'Salvando',
        text: 'Aguarde uns segundinhos.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      let postData: any = post

      const hero = postData.images[0]
      const thumbnail = postData.images[1]

      if (
        !postData.title ||
        !postData.subtitle ||
        !hero.file ||
        !thumbnail.file ||
        !postData.body
      )
        throw new Error('Empty fields')

      if (hero.file !== postFounded.images[0].file) {
        hero.file = await uploadImage(hero.file, 'heros')
      }

      if (thumbnail.file !== postFounded.images[1].file) {
        thumbnail.file = await uploadImage(thumbnail.file, 'thumbnails')
      }

      const newBlocks = await Promise.all(
        postData.body.map(async (block: any) => {
          if (block.type === 'photo' && block.file) {
            block.file = await uploadImage(block.file, 'photos')
          }
          return block
        }),
      )

      postData.body = newBlocks
      postData.slug = toSlug(postData.title)

      await updatePost(postData, +route.params.id)

      Swal.fire({
        title: 'Editado!',
        text: 'Tudo certo com o seu post.',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          Swal.hideLoading()
        },
        didClose: () => {
          router.push('/dashboard/posts')
        },
      })
    } catch (error: any) {
      if (error.message === 'Empty fields') {
        Swal.fire({
          title: 'Erro!',
          text: 'Todos os campos precisam estar preenchidos.',
          icon: 'error',
          confirmButtonText: 'Ok',
          didOpen: () => {
            Swal.hideLoading()
          },
        })
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Houve algum erro durante a requisição. Tente novamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
          didOpen: () => {
            Swal.hideLoading()
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-post {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      &__form {
        display: flex;
        flex-direction: column;
        gap: 40px;

        .form-title {
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: $color-igor;
            opacity: $opacity-60;
            margin-top: 6px;
          }
        }

        &__images {
          display: flex;
          flex-direction: column;
          gap: 40px;

          &__field {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
        }

        &__body {
          &__header {
            display: flex;
            flex-direction: column;
            gap: 20px;

            p {
              opacity: $opacity-80;
            }
          }
        }

        &__review,
        &__spotify {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        &__submit {
          background: $color-igor;
          border-radius: $radius-10;
          white-space: nowrap;
          padding: 20px;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          transition: $transition-default;

          &:disabled {
            opacity: $opacity-40;
            cursor: auto;
          }

          &:hover:not(:disabled) {
            background: $color-cherry;

            .text {
              color: $color-white;
            }
          }
        }
      }
    }
  }
</style>
