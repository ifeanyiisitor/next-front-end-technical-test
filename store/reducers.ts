import search from '../modules/search'
import { combineReducers } from 'redux'

export default combineReducers({
  [search.key]: search.reducer,
})
