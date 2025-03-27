type Tag = {
  id?: number
  title: string
  slug: string
}

type Review = {
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
  review?: Review
  spotify: {
    embed: boolean
    id: string | null
  }
}
