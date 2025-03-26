<template>
  <main class="new-post">
    <div class="new-post__wrapper dashboard-container">
      <Text as="h1" type="title-h1" color="cherry">Novo post</Text>

      <form class="new-post__wrapper__form">
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

        <div class="new-post__wrapper__form__options">
          <Select
            name="category"
            :options="categories"
            @change-select="(selected) => (post.category = selected)"
          >
            Categoria
          </Select>

          <TagsChoice @change-tags="(tags) => (post.tags = tags)" />
        </div>

        <div class="new-post__wrapper__form__images">
          <div class="new-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Hero
            </Text>
            <File
              type="hero"
              @change-file="(file) => (post.images[0].file = file)"
            />
          </div>

          <div class="new-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Thumbnail
            </Text>
            <File
              type="thumbnail"
              @change-file="(file) => (post.images[1].file = file)"
            />
          </div>
        </div>

        <div class="new-post__wrapper__form__body">
          <div class="new-post__wrapper__form__body__header">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Corpo
            </Text>

            <Text type="text-16" color="black">
              O construtor de post funciona semelhante a outros editores, como
              WordPress, etc. Basta selecionar uma ferramenta ao lado, e cada
              ferramenta corresponde a um bloco.
            </Text>
          </div>

          <BodyBuilder @change-body="(body) => (post.body = body)" />
        </div>

        <div
          v-show="post.category === 'critica'"
          class="new-post__wrapper__form__review"
        >
          <Text class="form-title" as="h2" type="title" color="cherry">
            Crítica
          </Text>

          <Review @change-review="(review) => (post.review = review)" />
        </div>

        <div class="new-post__wrapper__form__spotify">
          <Text class="form-title" as="h2" type="title" color="cherry">
            Spotify
          </Text>

          <Spotify @change-spotify="(spotify) => (post.spotify = spotify)" />
        </div>

        <button class="new-post__wrapper__form__submit" @click.prevent="submit">
          <Text type="title" color="cherry">Postar!</Text>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  import Text from '@/components/Text.vue'
  import Field from '@/components/Field.vue'
  import File from '@/components/File.vue'
  import Select from '@/components/Select.vue'
  import TagsChoice from '@/components/TagsChoice.vue'
  import BodyBuilder from '@/components/BodyBuilder.vue'
  import Review from '@/components/Review.vue'
  import Spotify from '@/components/Spotify.vue'
  import Swal from 'sweetalert2'

  import useImages from '@/composables/images'
  import usePosts from '@/composables/posts'

  const { uploadImage } = useImages()
  const { insertPost } = usePosts()

  const categories = [
    {
      title: 'Devaneio',
      slug: 'devaneio',
    },
    {
      title: 'Lista',
      slug: 'lista',
    },
    {
      title: 'Crítica',
      slug: 'critica',
    },
    {
      title: 'Playlist',
      slug: 'playlist',
    },
  ]

  const post = reactive<Post>({
    title: '',
    subtitle: '',
    category: '',
    tags: null,
    images: [
      {
        type: 'hero',
        file: null,
      },
      {
        type: 'thumbnail',
        file: null,
      },
    ],
    body: null,
    spotify: {
      embed: false,
      id: null,
    },
  })

  function toSlug(string: string) {
    return string
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  async function submit() {
    try {
      Swal.fire({
        title: 'Postando',
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
        !postData.category ||
        !hero.file ||
        !thumbnail.file ||
        !postData.body
      )
        throw new Error('Empty fields')

      if (postData.category === 'critica' && !postData.review)
        throw new Error('Empty fields')

      postData.images[0].file = await uploadImage(hero.file, 'heros')
      postData.images[1].file = await uploadImage(thumbnail.file, 'thumbnails')

      const newBlocks = await Promise.all(
        postData.body.map(async (block: any) => {
          if (block.type === 'photo') {
            block.file = await uploadImage(block.file, 'photos')
          }
          return block
        }),
      )

      postData.body = newBlocks
      postData.slug = toSlug(postData.title)
      insertPost(postData)

      Swal.fire({
        title: 'Postado!',
        text: 'Tudo certo com o seu post.',
        icon: 'success',
        confirmButtonText: 'Ok',
        didOpen: () => {
          Swal.hideLoading()
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
  .new-post {
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

        &__options {
          display: flex;
          gap: 40px;

          > div {
            &:first-child {
              width: 35%;
            }

            &:last-child {
              width: 65%;
            }
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

          &:hover {
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
