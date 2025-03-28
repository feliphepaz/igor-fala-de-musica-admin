type BlockType = 'paragraph' | 'highlight' | 'photo' | 'youtube'

type Block = {
  type: BlockType
  content?: string
  verses?: string[]
  music?: string
  band?: string
  file?: File | string
  copyright?: string
  description?: string
}
