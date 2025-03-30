type Tag = {
  id?: number
  title: string
  slug: string
}

type Spotify = {
  embed: boolean
  id: string | null
}

type Review = {
  album: {
    cover: string
    year?: string
    name: string
    artist: string
  }
  review: {
    score: string
    ratingText: string
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
      copyright: string | null
      description: string | null
    },
    {
      type: 'thumbnail'
      file: File | null
    },
  ]
  body: Block[]
  review?: Review
  spotify: Spotify
  highlight: boolean
}

type PostGetted = {
  id: number
  created_at: string
  title: string
  slug: string
  subtitle: string
  category: string
  tags: string[] | null
  images: [
    {
      type: 'hero'
      file: string
      copyright: string | null
      description: string | null
    },
    {
      type: 'thumbnail'
      file: string
    },
  ]
  body: Block[]
  review?: Review
  spotify: Spotify
  highlight: boolean
}

type Pagination = {
  currentPage: number
  totalPages: number
}
