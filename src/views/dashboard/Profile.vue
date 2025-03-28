<template>
  <main class="profile">
    <div class="profile__wrapper dashboard-container">
      <Text as="h1" type="title-h1" color="cherry">Perfil</Text>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'

  import Text from '@/components/Text.vue'

  import useAuth from '@/composables/auth'

  const { getSession } = useAuth()

  onMounted(async () => {
    const session = await getSession()
    console.log(session!.user)
  })
</script>

<style lang="scss" scoped>
  .profile {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
  }
</style>
