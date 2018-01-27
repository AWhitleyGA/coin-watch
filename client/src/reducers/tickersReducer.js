const initialState = {
  tickers: [],
  selectedTicker: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE TICKERS':
      return {
        ...state,
        tickers: action.payload
      }
    case 'SELECT TICKER':
      return {
        ...state,
        selectedTicker: action.payload
      }
    default:
      return state
  }
}
