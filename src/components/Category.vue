<template>
  <div class="select">
    <label :for="name">
      <Text as="span" type="text-18" color="black"><slot /></Text>
    </label>

    <select class="select__field" :id="name">
      <option value="">Selecione</option>
      <option value="devaneio">Devaneio</option>
      <option value="lista">Lista</option>
      <option value="critica">Crítica</option>
      <option value="playlist">Playlist</option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'

  interface Props {
    name: string
  }

  defineProps<Props>()
</script>

<style lang="scss" scoped>
  .select {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__field {
      outline: none;
      border: 1px solid $color-igor;
      border-radius: $radius-10;
      padding: 10px;
      font-family: $font-sans;
      font-weight: $weight-regular;
      font-size: 16px;
      line-height: 120%;
    }
  }
</style>
