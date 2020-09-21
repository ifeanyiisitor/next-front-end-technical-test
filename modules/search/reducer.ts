import { SET_SEARCH_PARAMS, APPEND_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS } from './actions'
import { SearchResult, SearchState, Action, SearchParams } from './types'

export const KEY = 'search'

const initialState: SearchState = {
  params: {
    limit: 10,
    offset: 0,
    entity: 'musicArtist',
    term: '',
  },
  results: {
    // ids: [],
    byId: {},
    hasMore: true,
  },
}

export function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case CLEAR_SEARCH_RESULTS: {
      return {
        ...state,
        results: {
          ids: undefined,
        },
      }
    }

    case SET_SEARCH_PARAMS: {
      const params = action.payload as SearchParams
      return {
        ...state,
        params: {
          ...state.params,
          ...params,
        },
      }
    }

    case APPEND_SEARCH_RESULTS: {
      const results = action.payload.results as SearchResult[]
      const hasMore = action.payload.hasMore as boolean
      return {
        ...state,
        results: {
          ids: (state.results.ids || []).concat(idsOf(results)),
          byId: {
            ...state.results.byId,
            ...idToResultMapOf(results),
          },
          hasMore,
        },
      }
    }

    default:
      return state
  }
}

function idsOf(results: SearchResult[] = []) {
  return results.map((item) => item.id)
}

function idToResultMapOf(results: SearchResult[] = []) {
  return results.reduce((acc, item) => {
    acc[item.id] = item
    return acc
  }, {})
}
