import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function usePosts() {
  const posts = ref<PostGetted[]>([])

  async function getPost(id: number) {
    const { data, error } = await supabase.from('posts').select().eq('id', id)

    if (error) throw Error

    return data[0]
  }

  async function getPostsByAuthor(authorId: string) {
    const { data, error } = await supabase
      .from('posts')
      .select()
      .eq('author', authorId)

    if (error) throw Error

    posts.value = data
  }

  async function insertPost(post: any) {
    const { data, error } = await supabase.from('posts').insert(post).select()

    if (error) throw Error

    return data[0]
  }

  async function updatePost(post: any, id: number) {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()

    if (error) throw Error

    return data[0]
  }

  async function deletePost(id: number) {
    const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)
      .select()

    if (error) throw Error

    return data[0]
  }

  return {
    posts,
    getPost,
    getPostsByAuthor,
    insertPost,
    updatePost,
    deletePost,
  }
}
