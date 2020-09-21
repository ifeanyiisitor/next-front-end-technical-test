import { SearchResult as SearchResultType } from 'modules/search'
import SearchResultItem from './SearchResultItem'

interface SearchResultProps {
  value: SearchResultType
}

export default function SearchResult({ value: item }: SearchResultProps) {
  return (
    <>
      {item.wrapperType === 'artist' && (
        <SearchResultItem
          superText={`${item.primaryGenreName} Artist`}
          mainText={item.artistName}
          mainTextHref={item.artistLinkUrl}
        />
      )}

      {item.wrapperType === 'collection' && (
        <SearchResultItem
          superText={`${item.primaryGenreName} Album`}
          mainText={item.collectionName}
          mainTextHref={item.collectionViewUrl}
        />
      )}

      {item.wrapperType === 'track' && (
        <SearchResultItem
          superText={`${item.primaryGenreName} Song`}
          mainText={item.trackName}
          mainTextHref={item.trackViewUrl}
        />
      )}
    </>
  )
}
