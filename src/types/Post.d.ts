type Post = {
  slug: string
  title: string
  subtitle: string
  body: {
    type: 'paragraph' | 'image' | 'youtube'
    content?: string
    src?: string
  }[]
  images: {
    type: 'hero' | 'thumbnail'
    src: string
  }[]
  tags?: number[]
  category?: 'Devaneio' | 'Lista' | 'Crítica' | 'Playlist'
}
