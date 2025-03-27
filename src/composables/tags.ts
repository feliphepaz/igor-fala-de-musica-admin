import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function useTags() {
  const tags = ref<Tag[]>([])

  async function getTags() {
    const { data, error } = await supabase.from('tags').select()

    if (error) throw Error

    tags.value = data as []
  }

  async function getTag(tag: string) {
    const { data, error } = await supabase.from('tags').select().eq('slug', tag)

    if (error) throw Error

    return data[0]
  }

  async function insertPostInTag(postId: number, tag: string) {
    const tagData = await getTag(tag)

    const tags = tagData.posts ?? []

    const { error } = await supabase
      .from('tags')
      .update({ posts: [...tags, postId] })
      .eq('slug', tag)

    if (error) throw Error
  }

  return {
    tags,
    getTags,
    insertPostInTag,
  }
}
