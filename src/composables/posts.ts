import { supabase } from '@/lib/supabase'

export default function usePosts() {
  async function insertPost(data: any) {
    const { error } = await supabase.from('posts').insert(data)

    if (error) throw Error
  }

  return {
    insertPost,
  }
}
