import axios from 'axios'
import { SearchParams, SearchRecord } from './types'

export async function performSearch(params: SearchParams) {
  const response = await axios.get(
    `https://itunes.apple.com/search?term=${params.term}&entity=${params.entity}&limit=${params.limit}&offset=${params.offset}`
  )
  return (response.data?.results || []).map((record: SearchRecord) => ({
    id: getRecordId(record),
    ...record,
  }))
}

function getRecordId(record: SearchRecord) {
  if (record.collectionType === 'Album') {
    return record.collectionId
  }
  if (record.wrapperType === 'track') {
    return record.trackId
  }
  return record.artistId
}
