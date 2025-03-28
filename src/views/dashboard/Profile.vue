<template>
  <main class="profile">
    <div class="profile__wrapper dashboard-container">
      <Text as="h1" type="title-h1" color="cherry">Perfil</Text>

      <div class="profile__wrapper__author">
        <div class="profile__wrapper__author__avatar">
          <img :src="imagePreview" alt="" />

          <input
            style="display: none"
            @change="({ target }) => getImage(target as EventTarget)"
            id="avatar"
            type="file"
          />
          <input
            class="profile__wrapper__author__avatar__button"
            type="button"
            value="Escolher arquivo"
            onclick="document.getElementById('avatar').click();"
          />
        </div>

        <div class="profile__wrapper__author__content">
          <SmallField
            name="name"
            placeholder="Nome do autor"
            big-label
            v-model="author.name"
          >
            Nome
          </SmallField>

          <Field
            type="biography"
            name="biography"
            placeholder="Biografia do autor"
            v-model="author.biography"
          >
            Biografia
          </Field>

          <SmallField
            name="x"
            placeholder="Link do X"
            v-model="author.social.x"
            big-label
          >
            X
          </SmallField>

          <SmallField
            name="instagram"
            placeholder="Link do Instagram"
            v-model="author.social.instagram"
            big-label
          >
            Instagram
          </SmallField>

          <button
            class="profile__wrapper__author__content__submit"
            @click.prevent="submit"
            type="button"
            :disabled="modifications <= 1"
          >
            <Text type="title" color="cherry">Salvar!</Text>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  import Text from '@/components/Text.vue'
  import SmallField from '@/components/SmallField.vue'
  import Field from '@/components/Field.vue'
  import Swal from 'sweetalert2'

  import useAuth from '@/composables/auth'
  import useAuthors from '@/composables/authors'
  import useImages from '@/composables/images'

  const { getSession } = useAuth()
  const { author, getAuthor, updateAuthor } = useAuthors()
  const { uploadImage } = useImages()
  const router = useRouter()

  const file = ref<File | null>(null)
  const modifications = ref(0)
  const imagePreview = ref('')

  onMounted(async () => {
    const session = await getSession()
    await getAuthor(session!.user.id)

    imagePreview.value = author.value.avatar
  })

  watch(
    [
      () => author.value.name,
      () => author.value.biography,
      () => author.value.social.x,
      () => author.value.social.instagram,
      file,
    ],
    () => {
      modifications.value++
    },
  )

  function getImage(target: EventTarget) {
    const fileRaw = (target as HTMLInputElement).files?.[0]
    const reader = new FileReader()

    reader.onload = () => {
      imagePreview.value = reader.result as string
    }

    if (fileRaw) {
      file.value = fileRaw
      reader.readAsDataURL(fileRaw)
    }
  }

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

      let authorData: any = author.value

      if (!authorData.name || !authorData.biography)
        throw new Error('Empty fields')

      if (file.value) {
        authorData.avatar = await uploadImage(file.value, 'avatars')
      }

      await updateAuthor(authorData, author.value.id)

      Swal.fire({
        title: 'Editado!',
        text: 'Tudo certo com o autor.',
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
          text: 'Nome e biografia são campos obrigatórios.',
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
  .profile {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;

      &__author {
        display: flex;
        gap: 40px;

        &__avatar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          img {
            width: 120px;
            height: 120px;
            border-radius: $radius-rounded;
            background: $color-white;
          }

          &__button {
            background: transparent;
            border-radius: $radius-20;
            padding: 10px 20px;
            border: $border-dashed;
            cursor: pointer;
            transition: $transition-default;
            font-family: $font-sans;
            font-weight: $weight-regular;
            font-size: 18px;
            font-weight: $weight-bold;
            color: $color-cherry;

            &:hover {
              background: $color-white;
            }
          }
        }

        &__content {
          display: flex;
          flex-direction: column;
          width: 400px;
          gap: 20px;

          &__submit {
            background: $color-igor;
            border-radius: $radius-10;
            white-space: nowrap;
            padding: 20px;
            border: none;
            cursor: pointer;
            margin-top: 10px;
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
  }
</style>
