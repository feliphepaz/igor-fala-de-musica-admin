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

        <File type="hero" @change-file="(file) => console.log(file)" />
        <File type="thumbnail" @change-file="(file) => console.log(file)" />
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'
  import Field from '@/components/Field.vue'
  import File from '@/components/File.vue'
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
        gap: 30px;
      }
    }
  }
</style>
