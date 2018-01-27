const initialState = {
  prices: [],
  priceHistory: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE PRICES':
      return {
        ...state,
        prices: action.payload
      }
    case 'CLEAR PRICE HISTORY':
      return {
        ...state,
        priceHistory: []
      }
    case 'RECEIVE PRICE HISTORY':
      return {
        ...state,
        priceHistory: action.payload
      }
    default:
      return state
  }
}
