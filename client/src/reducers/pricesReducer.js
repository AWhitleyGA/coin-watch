const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE PRICES':
      return action.prices
    default:
      return state
  }
}
