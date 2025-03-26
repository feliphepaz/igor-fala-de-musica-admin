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
        <Tag
          v-for="tag in tags"
          :key="tag.id"
          :slug="tag.slug"
          @change-tag="(tag, selected) => manageTags(tag, selected)"
        >
          {{ tag.title }}
        </Tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  import Tag from '@/components/Tag.vue'
  import Text from '@/components/Text.vue'

  import useTags from '@/composables/tags'

  const { tags, getTags } = useTags()

  const activeTags = ref<string[]>([])

  onMounted(async () => {
    await getTags()
  })

  const emit = defineEmits(['changeTags'])

  function manageTags(tag: string, selected: boolean) {
    if (selected) {
      if (!activeTags.value.includes(tag)) {
        activeTags.value.push(tag)
      }
    } else {
      const index = activeTags.value.indexOf(tag)
      if (index !== -1) {
        activeTags.value.splice(index, 1)
      }
    }

    emit('changeTags', activeTags.value)
  }
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

        &::-webkit-scrollbar {
          width: 4px;
          background: rgba(0, 0, 0, 0.1);
        }

        &::-webkit-scrollbar-thumb {
          background: $color-white;
        }
      }
    }
  }
</style>
