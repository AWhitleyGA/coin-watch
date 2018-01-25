export function updateSearchSymbol (symbol) {
  return {
    type: 'UPDATE SEARCH SYMBOL',
    payload: symbol
  }
}

export function selectSymbol (symbol) {
  return {
    type: 'SELECT SYMBOL',
    payload: symbol
  }
}
