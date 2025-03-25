<template>
  <main class="new-post">
    <div class="new-post__wrapper dashboard-container">
      <Text as="h1" type="title-h1" color="cherry">Novo post</Text>

      <form class="new-post__wrapper__form">
        <Field type="title" name="title" placeholder="Título do post">
          Título
        </Field>

        <Field type="subtitle" name="subtitle" placeholder="Subtítulo do post">
          Subtítulo
        </Field>

        <div class="new-post__wrapper__form__options">
          <Select name="category" :options="categories">Categoria</Select>
          <TagsChoice />
        </div>

        <div class="new-post__wrapper__form__images">
          <div class="new-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Hero
            </Text>
            <File type="hero" @change-file="(file) => console.log(file)" />
          </div>

          <div class="new-post__wrapper__form__images__field">
            <Text class="form-title" as="h2" type="title" color="cherry">
              Thumbnail
            </Text>
            <File type="thumbnail" @change-file="(file) => console.log(file)" />
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

          <BodyBuilder />
        </div>

        <div class="new-post__wrapper__form__review">
          <Text class="form-title" as="h2" type="title" color="cherry">
            Crítica
          </Text>

          <Review />
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'
  import Field from '@/components/Field.vue'
  import File from '@/components/File.vue'
  import Select from '@/components/Select.vue'
  import TagsChoice from '@/components/TagsChoice.vue'
  import BodyBuilder from '@/components/BodyBuilder.vue'
  import Review from '@/components/Review.vue'

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

        &__review {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      }
    }
  }
</style>
