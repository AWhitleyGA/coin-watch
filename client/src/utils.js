import axios from 'axios'

export function checkAuthentication () {
  return new Promise((resolve, reject) => {
    let token = localStorage.getItem('CoinWatchToken')
    axios({
      method: 'get',
      url: '/api/auth/user',
      headers: {
        'Authorization': token
      }
    })
    .then((response) => {
      resolve(response.data)
    })
    .catch((err) => {
      reject(err)
    })
  })
}
