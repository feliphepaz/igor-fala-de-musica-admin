import { supabase } from '@/lib/supabase'

export default function useAuth() {
  async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${import.meta.env.VITE_REDIRECT_URL}/dashboard`,
      },
    })

    if (error) alert(error)
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      alert(error)
      throw Error
    }
  }

  async function getSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) return alert(error)

    return data.session
  }

  return {
    login,
    logout,
    getSession,
  }
}
