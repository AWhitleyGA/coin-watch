import React, { Component } from 'react'
import { connect } from 'react-redux'

import LoginForm from '../components/LoginForm'

import { updateCredentials, postCredentials } from '../actions/auth'

class LoginView extends Component {
  componentDidMount () {
    if (this.props.auth.user) {
      this.props.history.push('/dashboard')
    }
  }

  componentDidUpdate () {
    if (this.props.auth.user) {
      let previousLocation = this.props.history.location.state && this.props.history.location.state.previousLocation

      if (previousLocation) {
        this.props.history.push(previousLocation)
      } else {
        this.props.history.push('/dashboard')
      }
    }
  }

  render () {
    return (
      <LoginForm
        fields={['email', 'password']}
        onInput={this.props.handleInput}
        onSubmit={this.props.handleSubmit}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (e) => {
      dispatch(updateCredentials(e.target.name, e.target.value))
    },
    handleSubmit: (e) => {
      dispatch(postCredentials())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
