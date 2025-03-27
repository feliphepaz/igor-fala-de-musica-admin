import { supabase } from '@/lib/supabase'

export default function usePosts() {
  async function getPost(id: number) {
    const { data, error } = await supabase.from('posts').select().eq('id', id)

    if (error) throw Error

    console.log(data)

    return data[0]
  }

  async function insertPost(post: any) {
    const { data, error } = await supabase.from('posts').insert(post).select()

    if (error) throw Error

    return data[0]
  }

  return {
    getPost,
    insertPost,
  }
}
