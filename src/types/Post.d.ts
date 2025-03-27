type Tag = {
  id?: number
  title: string
  slug: string
}

type Post = {
  title: string
  subtitle: string
  category: string
  tags: string[] | null
  images: [
    {
      type: 'hero'
      file: File | null
    },
    {
      type: 'thumbnail'
      file: File | null
    },
  ]
  body: Block[]
  review?: {
    album: {
      cover: string
      year?: string
      name: string
      artist: string
    }
    rating: {
      score: string
      text: string
    }
  }
  spotify: {
    embed: boolean
    id: string | null
  }
}
