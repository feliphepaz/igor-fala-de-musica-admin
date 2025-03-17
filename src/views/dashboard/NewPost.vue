<template>
  <main class="new-post">
    {{ data }}
    <div class="dashboard-container">
      <form class="new-post__form">
        <label>slug</label>
        <input v-model="data.slug" type="text" />

        <label>title</label>
        <input v-model="data.title" type="text" />

        <label>subtitle</label>
        <input v-model="data.subtitle" type="text" />

        <button @click.prevent="submit">Enviar!</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  function submit() {
    console.log('enviou!')
  }

  const data = reactive({
    slug: null,
    title: null,
    subtitle: null,
    body: null,
  })
</script>

<style lang="scss" scoped>
  .new-post {
    &__form {
      display: flex;
      flex-direction: column;
    }
  }
</style>
