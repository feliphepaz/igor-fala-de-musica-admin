import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function useTags() {
  type Tag = {
    id: number
    title: string
    slug: string
  }

  const tags = ref<Tag[]>([])

  async function getTags() {
    const { data, error } = await supabase.from('tags').select()

    if (error) throw Error

    tags.value = data as []
  }

  return {
    tags,
    getTags,
  }
}
