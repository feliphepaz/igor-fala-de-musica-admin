<template>
  <div class="posts-grid">
    <ul class="posts-grid__posts">
      <li v-for="(post, index) in posts" :key="index">
        <Post :post="post" @post-deleted="emit('refreshPosts')" />
      </li>
    </ul>

    <nav v-if="pagination" class="posts-grid__pagination">
      <button :disabled="actualPage <= 1" @click="actualPage -= 1">
        <ArrowIcon />
      </button>

      <button
        v-for="(page, index) in pages"
        :key="index"
        :class="{ '-is-active': actualPage === page }"
        @click="actualPage = page"
      >
        <Text as="span" type="text-16" color="black">{{ page }}</Text>
      </button>

      <button
        :disabled="actualPage >= pagination.totalPages"
        @click="actualPage += 1"
      >
        <ArrowIcon />
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { ArrowIcon } from '@/assets/icons'

  import Post from '@/components/Post.vue'
  import Text from '@/components/Text.vue'

  interface Props {
    posts: any
    pagination?: Pagination
    columns?: number
  }

  const { posts, pagination, columns = 2 } = defineProps<Props>()

  const actualPage = ref(pagination ? pagination.currentPage : 0)

  const emit = defineEmits(['refreshPosts'])

  const pages = computed(() => {
    if (!pagination) return

    if (actualPage.value > 1 && actualPage.value < pagination.totalPages)
      return [actualPage.value - 1, actualPage.value, actualPage.value + 1]
    else if (actualPage.value === pagination.totalPages)
      return [actualPage.value - 2, actualPage.value - 1, actualPage.value]
    else return [actualPage.value, actualPage.value + 1, actualPage.value + 2]
  })
</script>

<style lang="scss" scoped>
  .posts-grid {
    &__posts {
      display: grid;
      grid-template-columns: repeat(v-bind(columns), 1fr);
      gap: 20px 40px;

      @include before-mobile {
        grid-template-columns: 1fr;
      }
    }

    &__pagination {
      display: flex;
      gap: 10px;
      margin-top: 40px;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: $color-white;
        transition: $transition-default;
        cursor: pointer;
        border: none;
        outline: none;

        &:disabled {
          opacity: $opacity-40;
          cursor: default;
        }

        &:hover:not(:disabled),
        &.-is-active {
          background: $color-igor;

          span {
            color: $color-white;
          }
        }

        &:last-child svg {
          transform: rotate(-180deg);
        }
      }
    }
  }
</style>
