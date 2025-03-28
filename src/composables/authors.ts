import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function useAuthors() {
  type Author = {
    id: number
    name: string
    biography: string
    social: {
      x: string | null
      instagram: string | null
    }
    avatar: string
  }

  const author = ref<Author>({
    id: 0,
    name: '',
    biography: '',
    social: {
      x: null,
      instagram: null,
    },
    avatar: '',
  })

  async function getAuthor(id: string) {
    const { data, error } = await supabase.from('authors').select().eq('id', id)

    if (error) throw Error

    author.value = data[0]
  }

  async function updateAuthor(author: any, id: number) {
    const { data, error } = await supabase
      .from('authors')
      .update(author)
      .eq('id', id)
      .select()

    if (error) throw Error

    return data[0]
  }

  return {
    author,
    getAuthor,
    updateAuthor,
  }
}
