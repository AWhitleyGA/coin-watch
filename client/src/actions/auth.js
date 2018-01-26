import axios from 'axios'

export function updateCredentials (property, value) {
  return {
    type: 'UPDATE CREDENTIALS',
    payload: {
      [property]: value
    }
  }
}

export function postCredentials () {
  return (dispatch, getState) => {
    const { email, password } = getState().auth.login

    axios.post('/api/auth/login', {
      email: email,
      password: password
    })
    .then((response) => {
      localStorage.setItem('CoinWatchToken', response.data.token)
      dispatch(setUser(email))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export function postToken () {
  return (dispatch, getState) => {
    let token = localStorage.getItem('CoinWatchToken')
    axios({
      method: 'get',
      url: '/api/auth/user',
      headers: {
        'Authorization': token
      }
    })
    .then((res) => {
      dispatch(setUser(res.data.email))
    })
    .catch((err) => {
      console.log(err)
    })
  }
}

export function setUser (email) {
  return {
    type: 'SET USER',
    payload: email
  }
}

export function clearUser () {
  localStorage.removeItem('CoinWatchToken')
  return {
    type: 'CLEAR USER'
  }
}
