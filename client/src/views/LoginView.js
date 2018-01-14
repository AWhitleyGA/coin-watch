import React, { Component } from 'react'
import axios from 'axios'

import LoginForm from '../components/LoginForm'

class LoginView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    axios.post('/api/auth/login', {
      email: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      localStorage.setItem('CoinWatchToken', response.data.token)
      let previousLocation = this.props.history.location.state.previousLocation
      if (previousLocation) {
        this.props.history.push(previousLocation)
      } else {
        this.props.history.push('/dashboard')
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <LoginForm
        fields={['email', 'password']}
        onInput={this.handleInput}
        onSubmit={this.handleSubmit}
      />
    )
  }
}


export default LoginView
