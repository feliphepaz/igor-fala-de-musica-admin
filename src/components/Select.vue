<template>
  <div class="select">
    <label :for="name">
      <Text as="span" type="text-18" color="black"><slot /></Text>
    </label>

    <select
      class="select__field"
      :id="name"
      @change="({ target }) => getSelected(target as EventTarget)"
    >
      <option value="">Selecione</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="getOptionValue(option, index)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'

  type Album = {
    name: string
    artist: string
  }

  type Category = {
    title: string
    slug: string
  }

  interface Props {
    name: string
    options: Album[] | Category[]
  }

  function getOptionValue(option: Album | Category, index: number) {
    if ('artist' in option) {
      return index
    }

    if ('slug' in option) {
      return option.slug
    }
  }

  function getOptionLabel(option: Album | Category) {
    if ('artist' in option) {
      return `${option.name} - ${option.artist}`
    }

    return option.title
  }

  defineProps<Props>()

  const emit = defineEmits(['changeSelect'])

  function getSelected(target: EventTarget) {
    emit('changeSelect', (target as HTMLInputElement).value)
  }
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
