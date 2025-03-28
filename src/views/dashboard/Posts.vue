<template>
  <main class="posts">
    <div class="posts__wrapper dashboard-container">
      <div class="posts__wrapper__header">
        <Text as="h1" type="title-h1" color="cherry">Seus posts</Text>
        <Button as-link to="/dashboard/posts/novo-post">Novo post</Button>
      </div>

      <PostsGrid :posts="posts" @refresh-posts="fetchPosts" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  import Text from '@/components/Text.vue'
  import PostsGrid from '@/components/PostsGrid.vue'
  import Button from '@/components/Button.vue'

  import useAuth from '@/composables/auth'
  import usePosts from '@/composables/posts'

  const { getSession } = useAuth()
  const { posts, getPostsByAuthor } = usePosts()

  onMounted(async () => {
    await fetchPosts()
  })

  async function fetchPosts() {
    const session = await getSession()
    return await getPostsByAuthor(session!.user.id)
  }
</script>

<style lang="scss" scoped>
  .posts {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
      }
    }
  }
</style>
