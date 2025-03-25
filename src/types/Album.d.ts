type Album = {
  name: string
  artist: string
  image: {
    '#text': string
    size: 'small' | 'medium' | 'large' | 'extralarge'
  }[]
}
