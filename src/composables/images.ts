import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function useImages() {
  async function uploadImage(
    file: File,
    bucket: 'heros' | 'thumbnails' | 'photos' | 'avatars',
  ) {
    const path = `${file.name.replace(/\.(jpg|png|jpeg)/gi, '')}_${uuidv4()}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)

    if (error) throw Error

    return `${import.meta.env.VITE_IMAGE_DOMAIN}/storage/v1/object/public/${bucket}//${data.path}`
  }

  return {
    uploadImage,
  }
}
