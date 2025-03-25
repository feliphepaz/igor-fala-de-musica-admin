<template>
  <div class="select">
    <label :for="name">
      <Text as="span" type="text-18" color="black"><slot /></Text>
    </label>

    <select class="select__field" :id="name">
      <option value="">Selecione</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
  import Text from '@/components/Text.vue'

  type Option = {
    name: string
    value: string
  }

  type Category = {
    title: string
    slug: string
  }

  interface Props {
    name: string
    options: Option[] | Category[]
  }

  function getOptionValue(option: Option | Category) {
    if ('value' in option) {
      return option.value
    }
    return option.slug
  }

  function getOptionLabel(option: Option | Category) {
    if ('name' in option) {
      return option.name
    }
    return option.title
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
