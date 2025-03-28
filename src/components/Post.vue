<template>
  <RouterLink class="post" :to="`/dashboard/posts/${post.id}`">
    <button class="post__delete" @click.prevent="exclude">
      <CloseIcon />
    </button>

    <img :src="post.images[1].file" :alt="post.title" />

    <div class="post__content">
      <div class="post__content__legend">
        <Text as="span" type="legend" color="black">{{ date }}</Text>
        <Text as="span" type="text-14" variant="bold" color="black">
          {{ category }}
        </Text>
      </div>

      <Text as="h3" type="title" color="black">
        {{ post.title }}
      </Text>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { CloseIcon } from '@/assets/icons'

  import Text from '@/components/Text.vue'
  import Swal from 'sweetalert2'

  import usePosts from '@/composables/posts'
  import useCategories from '@/composables/categories'
  import useTags from '@/composables/tags'

  const { deletePost } = usePosts()
  const { deletePostInCategory } = useCategories()
  const { deletePostInTag } = useTags()

  interface Props {
    post: PostGetted
  }

  const { post } = defineProps<Props>()

  const emit = defineEmits(['postDeleted'])

  const date = computed(() => {
    const date = new Date(post.created_at)
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    return `${date.getDate()}/${month}/${date.getFullYear()}`
  })
  const category = computed(() => {
    if (post.category === 'critica') return 'Crítica'
    else return post.category.charAt(0).toUpperCase() + post.category.slice(1)
  })

  function exclude() {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Essa ação não pode ser desfeita!',
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      Swal.fire({
        title: 'Excluindo',
        text: 'Aguarde uns segundinhos.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      if (result.isConfirmed) {
        const data = await deletePost(post.id)
        await deletePostInCategory(data.id, data.category)

        if (post.tags) {
          for (const tag of post.tags) {
            await deletePostInTag(data.id, tag)
          }
        }

        Swal.fire({
          title: 'Excluído!',
          text: 'Post deletado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok',
          didOpen: () => {
            Swal.hideLoading()
          },
          didClose: () => {
            emit('postDeleted')
          },
        })
      } else if (result.isDenied) {
        Swal.close()
      }
    })
  }
</script>

<style lang="scss" scoped>
  .post {
    display: flex;
    position: relative;
    gap: 20px;
    width: 100%;
    background: $color-white;
    transition: $transition-default;
    padding: 20px;

    @include tablet {
      flex-direction: column;
      gap: 10px;
    }

    &:hover,
    &:focus {
      background: $color-igor;
    }

    img {
      width: 180px;
      min-width: 180px;
      height: 100px;

      @include tablet {
        width: 100%;
        height: 120px;
      }
    }

    &__delete {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      position: absolute;
      right: -10px;
      top: -10px;
      border: none;
      background: $color-white;
      border-radius: $radius-rounded;
      cursor: pointer;
      transition: $transition-default;

      &:hover {
        background: $color-cherry;

        :deep(svg path) {
          fill: $color-white;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 10px;

      &__legend {
        display: flex;
        gap: 10px;
      }
    }
  }
</style>
