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

type PostGetted = {
  id: number
  created_at: string
  title: string
  subtitle: string
  category: string
  tags: string[] | null
  images: [
    {
      type: 'hero'
      file: string
    },
    {
      type: 'thumbnail'
      file: string
    },
  ]
  body: Block[]
  review?: Review
  spotify: {
    embed: boolean
    id: string | null
  }
}

type Pagination = {
  currentPage: number
  totalPages: number
}
