export type SearchEntity = 'musicArtist' | 'album' | 'musicTrack'

export interface Action {
  type: string
  payload: any
}

export interface SearchParams {
  term?: string
  entity?: SearchEntity
  limit?: number
  offset?: number
}

export interface SearchRecord {
  trackId?: number
  trackName?: string
  trackViewUrl?: string
  artistId?: number
  artistName?: string
  artistType?: string
  artistLinkUrl?: string
  artistViewUrl?: string
  primaryGenreName?: string
  collectionName?: string
  collectionType?: string
  collectionId?: string
  collectionViewUrl?: string
  wrapperType: string
  [key: string]: any
}

export interface SearchResult extends SearchRecord {
  id: string
}

export interface SearchState {
  params: {
    term?: string
    entity?: SearchEntity
    limit: number
    offset: number
  }
  results: {
    ids?: string[]
    byId: {
      [key: string]: SearchResult
    }
    hasMore: boolean
  }
}
