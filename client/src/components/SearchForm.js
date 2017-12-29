import React from 'react'

import './SearchForm.css'

const SearchForm = (props) => {
  let { onSearchSubmit, onSearchInput, label, placeholder } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearchSubmit) {
      onSearchSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="SearchForm SearchForm--secondary-theme">
      {
        label &&
        <label className="SearchForm__label">{label}</label>
      }
      <input
        type="text"
        placeholder={placeholder}
        onChange={onSearchInput}
        className="SearchForm__input"
      />
      {
        props.onSearchSubmit &&
        <input type="submit" value="Search" />
      }
    </form>
  )
}


export default SearchForm
