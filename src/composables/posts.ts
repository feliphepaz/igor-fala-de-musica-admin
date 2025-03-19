import { supabase } from '@/lib/supabase'
import type { Reactive } from 'vue'

export default function usePosts() {
  async function post(data: Reactive<Post>) {
    const { error } = await supabase.from('posts').insert({ ...data })

    if (error) alert(error)
  }

  return {
    post,
  }
}
