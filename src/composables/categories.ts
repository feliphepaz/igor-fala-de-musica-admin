import { supabase } from '@/lib/supabase'
import { ref } from 'vue'

export default function useCategories() {
  type Category = {
    id: number
    title: string
    slug: string
  }

  const categories = ref<Category[]>([])

  async function getCategories() {
    const { data, error } = await supabase.from('categories').select()

    if (error) throw Error

    categories.value = data as []
  }

  async function getCategory(category: string) {
    const { data, error } = await supabase
      .from('categories')
      .select()
      .eq('slug', category)

    if (error) throw Error

    return data[0]
  }

  async function insertPostInCategory(postId: number, category: string) {
    const categoryData = await getCategory(category)

    const posts = categoryData.posts ?? []

    const { error } = await supabase
      .from('categories')
      .update({ posts: [...posts, postId] })
      .eq('slug', category)

    if (error) throw Error
  }

  async function deletePostInCategory(postId: number, category: string) {
    const categoryData = await getCategory(category)

    const posts = categoryData.posts ?? []

    const { error } = await supabase
      .from('categories')
      .update({ posts: posts.filter((post: number) => post !== postId) })
      .eq('slug', category)

    if (error) throw Error
  }

  return {
    categories,
    getCategories,
    insertPostInCategory,
    deletePostInCategory,
  }
}
