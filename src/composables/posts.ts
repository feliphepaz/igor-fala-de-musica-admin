import { supabase } from '@/lib/supabase'

export default function usePosts() {
  async function insertPost(post: any) {
    const { data, error } = await supabase.from('posts').insert(post).select()

    if (error) throw Error

    return data[0]
  }

  return {
    insertPost,
  }
}
