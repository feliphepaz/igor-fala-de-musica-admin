import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function useTags() {
  const tags = ref<Tag[]>([])

  async function getTags() {
    const { data, error } = await supabase.from('tags').select()

    if (error) throw Error

    tags.value = data as []
  }

  async function insertTag(tag: Tag) {
    const { error } = await supabase.from('tags').insert(tag)

    if (error) throw Error
  }

  async function getTag(tag: string) {
    const { data, error } = await supabase.from('tags').select().eq('slug', tag)

    if (error) throw Error

    return data[0]
  }

  async function insertPostInTag(postId: number, tag: string) {
    const tagData = await getTag(tag)

    const posts = tagData.posts ?? []

    const { error } = await supabase
      .from('tags')
      .update({ posts: [...posts, postId] })
      .eq('slug', tag)

    if (error) throw Error
  }

  async function deletePostInTag(postId: number, tag: string) {
    const tagData = await getTag(tag)

    const posts = tagData.posts ?? []

    const { error } = await supabase
      .from('tags')
      .update({ posts: posts.filter((post: number) => post !== postId) })
      .eq('slug', tag)

    if (error) throw Error
  }

  return {
    tags,
    getTags,
    insertTag,
    insertPostInTag,
    deletePostInTag,
  }
}
