import { KEY } from './reducer'
import { SearchState } from './types'

export function selectSearchState(state: any) {
  return state[KEY] as SearchState
}

export function selectSearchResults(state: any) {
  const searchState = selectSearchState(state)
  const results = searchState.results
  return (results.ids || []).map((id) => results.byId[id])
}

export function selectHasMoreResults(state: any) {
  return selectSearchState(state).results.hasMore
}

export function selectHasPerformedSearch(state: any) {
  const ids = selectSearchState(state).results.ids
  return !!ids
}

export function selectSearchParams(state: any) {
  return selectSearchState(state).params
}
