import React from 'react'

const LoginForm = (props) => {
  const { fields, onInput, onSubmit } = props

  const submitForm = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  let formFields = fields.map((field, index) => {
    return (
      <input key={index} type={field === 'password' ? 'password' : 'text'} name={field} placeholder={field} onInput={onInput} />
    )
  })
  return (
    <form onSubmit={submitForm}>
      {formFields}
      <input type="submit" value="Login" />
    </form>
  )
}


export default LoginForm
