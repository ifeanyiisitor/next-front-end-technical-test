import { Dispatch } from 'redux'
import { performSearch } from './service'
import { selectSearchState } from './selectors'
import { SearchParams, SearchResult } from './types'

export const SET_SEARCH_PARAMS = 'app/search/SET_SEARCH_PARAMS'
export const CLEAR_SEARCH_RESULTS = 'app/search/CLEAR_SEARCH_RESULTS'
export const APPEND_SEARCH_RESULTS = 'app/search/APPEND_SEARCH_RESULTS'

export const setSearchParams = (payload: SearchParams) => ({ type: SET_SEARCH_PARAMS, payload })
export const clearSearchResults = () => ({ type: CLEAR_SEARCH_RESULTS })
export const appendSearchResults = (results: SearchResult[], hasMore: boolean) => ({
  type: APPEND_SEARCH_RESULTS,
  payload: { results, hasMore },
})

export function fetchMoreResults() {
  return async (dispatch: Dispatch, getState) => {
    const state = selectSearchState(getState())
    const params = state.params
    const offset = params.offset + params.limit
    dispatch(search({ ...state.params, offset }) as any)
  }
}

export function initiateNewSearch() {
  return async (dispatch: Dispatch, getState) => {
    const state = selectSearchState(getState())
    dispatch(clearSearchResults())
    dispatch(search(state.params) as any)
  }
}

export function search(params: SearchParams) {
  const term = params.term.split(' ').join('+')
  return async (dispatch: Dispatch, getState) => {
    const state = selectSearchState(getState())
    const searchParams = { ...state.params, ...params }
    dispatch(setSearchParams(searchParams))
    const results = await performSearch({ ...state.params, ...params, term })
    const hasMore = !!results.length
    dispatch(appendSearchResults(results, hasMore))
  }
}
