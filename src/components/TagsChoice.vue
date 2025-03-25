<template>
  <div class="tags-choice">
    <label>
      <Text as="span" type="text-18" color="black">Tags</Text>
    </label>

    <div class="tags-choice__wrapper">
      <div class="tags-choice__wrapper__add">
        <input
          class="tags-choice__wrapper__add__field"
          type="text"
          id="tag"
          placeholder="Adicione uma nova tag"
        />

        <button class="tags-choice__wrapper__add__submit" type="button">
          +
        </button>
      </div>

      <div class="tags-choice__wrapper__list">
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
        <Tag />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Tag from '@/components/Tag.vue'
  import Text from '@/components/Text.vue'
</script>

<style lang="scss" scoped>
  .tags-choice {
    display: flex;
    flex-direction: column;
    gap: 6px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;

      &__add {
        display: flex;

        &__field {
          width: 100%;
          outline: none;
          border: 1px solid $color-igor;
          border-radius: $radius-10 0 0 $radius-10;
          padding: 10px;
          font-family: $font-sans;
          font-weight: $weight-regular;
          font-size: 16px;
          line-height: 120%;

          &::placeholder {
            color: $color-black;
            opacity: $opacity-20;
          }
        }

        &__submit {
          background: $color-igor;
          border: none;
          outline: none;
          width: 35px;
          cursor: pointer;
          border-radius: 0 $radius-10 $radius-10 0;
          font-family: $font-sans;
          font-weight: $weight-bold;
          font-size: 20px;
          color: $color-white;
          transition: $transition-default;

          &:hover {
            background: $color-cherry;
          }
        }
      }

      &__list {
        display: flex;
        max-height: 100px;
        overflow-y: auto;
        overflow-x: hidden;
        flex-wrap: wrap;
        gap: 10px;
      }
    }
  }
</style>
