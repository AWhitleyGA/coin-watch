const initialState = {
  login: {
    email: '',
    password: ''
  },
  user: null
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE CREDENTIALS':
      return {
        ...state,
        login: {
          ...state.login,
          ...action.payload
        }
      }
    case 'SET USER':
      return {
        ...state,
        user: action.payload
      }
    case 'CLEAR USER':
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
