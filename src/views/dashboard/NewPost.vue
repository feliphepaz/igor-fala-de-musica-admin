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
          <Category name="category">Categoria</Category>
          <TagsChoice />
        </div>

        <div class="new-post__wrapper__form__images">
          <div class="new-post__wrapper__form__images__field">
            <Text as="h2" type="title" color="cherry">Hero</Text>
            <File type="hero" @change-file="(file) => console.log(file)" />
          </div>

          <div class="new-post__wrapper__form__images__field">
            <Text as="h2" type="title" color="cherry">Thumbnail</Text>
            <File type="thumbnail" @change-file="(file) => console.log(file)" />
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'
  import Field from '@/components/Field.vue'
  import File from '@/components/File.vue'
  import Category from '@/components/Category.vue'
  import TagsChoice from '@/components/TagsChoice.vue'
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

        &__options {
          display: flex;
          gap: 40px;

          > div {
            &:first-child {
              width: 45%;
            }

            &:last-child {
              width: 55%;
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

            h2 {
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
          }
        }
      }
    }
  }
</style>
