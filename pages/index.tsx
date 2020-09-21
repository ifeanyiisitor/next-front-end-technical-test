import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SearchResult from 'components/SearchResult'
import InfiniteScroll from 'react-infinite-scroll-component'

import { FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled, TextField, Select, MenuItem, Button } from '@material-ui/core'

import {
  selectSearchResults,
  selectHasMoreResults,
  fetchMoreResults,
  selectHasPerformedSearch,
  initiateNewSearch,
  selectSearchParams,
  setSearchParams,
  SearchEntity,
} from 'modules/search'

const Form = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr',
  gridColumnGap: theme.spacing(2),
}))

const Root = styled(Container)(({ theme }) => ({
  display: 'grid',
  gridRowGap: theme.spacing(3),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))

const SearchResultsList = styled('div')(({ theme }) => ({
  display: 'grid',
  gridRowGap: theme.spacing(2),
}))

export default function Index() {
  const dispatch = useDispatch()
  const params = useSelector(selectSearchParams)
  const results = useSelector(selectSearchResults)
  const hasMoreResults = useSelector(selectHasMoreResults)
  const hasPerformedSearch = useSelector(selectHasPerformedSearch)
  const hasSearchResults = Boolean(results.length)

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(initiateNewSearch())
  }

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchParams({ term: event.target.value }))
  }

  function handleSearchEntityTypeChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchParams({ entity: event.target.value as SearchEntity }))
  }

  return (
    <Root maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Artist, album and song search
      </Typography>

      <Form role="Search" aria-label="Artist Details Search" onSubmit={handleSearchSubmit}>
        <TextField
          placeholder="Enter your search term..."
          variant="outlined"
          value={params.term}
          onChange={handleSearchTermChange}
        />
        <Select variant="outlined" value={params.entity} onChange={handleSearchEntityTypeChange}>
          <MenuItem value="musicArtist">Artists</MenuItem>
          <MenuItem value="album">Albums</MenuItem>
          <MenuItem value="musicTrack">Songs</MenuItem>
        </Select>
        <Button variant="contained" type="submit">
          Search
        </Button>
      </Form>

      {hasPerformedSearch && !hasSearchResults && (
        <p role="status" aria-label="Search Status">
          There are no results
        </p>
      )}

      {hasPerformedSearch && hasSearchResults && (
        <InfiniteScroll
          dataLength={results.length}
          next={() => dispatch(fetchMoreResults())}
          hasMore={hasMoreResults}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
          <SearchResultsList role="list" aria-label="Search Results">
            {results.map((item) => (
              <SearchResult key={item.id} value={item} />
            ))}
          </SearchResultsList>
        </InfiniteScroll>
      )}
    </Root>
  )
}
