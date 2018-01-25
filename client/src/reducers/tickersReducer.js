const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE TICKERS':
      return action.tickers
    default:
      return state
  }
}
