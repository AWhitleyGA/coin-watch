const initialState = {
  searchSymbol: '',
  symbolSelected: false
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE SEARCH SYMBOL':
      return {
        ...state,
        searchSymbol: action.payload,
        symbolSelected: false
      }
    case 'SELECT SYMBOL':
      return {
        ...state,
        searchSymbol: action.payload,
        symbolSelected: true
      }
    default:
      return state
  }
}
