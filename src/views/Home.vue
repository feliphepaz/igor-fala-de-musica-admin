<template>
  <main class="home">
    <div class="home__wrapper container">
      <Logo />

      <div class="home__wrapper__info">
        <Text as="h3" type="text-18" variant="bold" color="black">
          Bem-vindo ao administrador!
        </Text>

        <Text type="text-18" color="black">
          Aqui você pode criar novas postagens, visualizar as que já escreveu,
          editar ou excluir cada uma delas, além de atualizar seus dados de
          autor.
        </Text>
      </div>

      <Button @click="login">Logar com Google!</Button>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { Logo } from '@/assets/logos'

  import Text from '@/components/Text.vue'
  import Button from '@/components/Button.vue'

  import useAuth from '@/composables/auth.ts'

  const { login } = useAuth()
</script>

<style lang="scss" scoped>
  .home {
    padding: 60px 0;

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 40px;

      &__info {
        display: flex;
        flex-direction: column;
        gap: 20px;
        text-align: center;
        max-width: 500px;
      }
    }
  }
</style>
