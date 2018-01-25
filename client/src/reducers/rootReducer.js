import { combineReducers } from 'redux'

import tickersReducer from './tickersReducer'
import pricesReducer from './pricesReducer'
import searchReducer from './searchReducer'

export default combineReducers({
  tickers: tickersReducer,
  prices: pricesReducer,
  search: searchReducer
})
