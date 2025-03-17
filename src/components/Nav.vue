<template>
  <nav class="nav">
    <div class="nav__header">
      <Text as="span" type="text-18" variant="bold" color="black">
        Feliphe Paz
      </Text>
      <Button @click="handleLogout">Sair!</Button>
    </div>

    <ul class="nav__menu">
      <li>
        <RouterLink
          to="/dashboard"
          :class="[{ '-is-active': $route.path === '/dashboard' }]"
        >
          <Text as="span" type="text-18" variant="bold" color="cherry">
            Home
          </Text>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/dashboard/posts"
          :class="[{ '-is-active': $route.path === '/dashboard/posts' }]"
        >
          <Text as="span" type="text-18" variant="bold" color="cherry">
            Posts
          </Text>
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/dashboard/perfil"
          :class="[{ '-is-active': $route.path === '/dashboard/perfil' }]"
        >
          <Text as="span" type="text-18" variant="bold" color="cherry">
            Perfil
          </Text>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink, useRouter } from 'vue-router'

  import Text from '@/components/Text.vue'
  import Button from '@/components/Button.vue'

  import useAuth from '@/composables/auth.ts'

  const router = useRouter()
  const { logout } = useAuth()

  async function handleLogout() {
    await logout()
    router.push('/')
  }
</script>

<style lang="scss" scoped>
  .nav {
    background: $color-white;
    width: 280px;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: $color-queen;
      gap: 40px;
      padding: 20px;
    }

    &__menu {
      display: flex;
      flex-direction: column;

      li a {
        width: 100%;
        padding: 20px;
        background: $color-white;
        transition: $transition-default;

        &:hover,
        &.-is-active {
          background: $color-igor;

          .text {
            color: $color-white;
          }
        }
      }
    }
  }
</style>
