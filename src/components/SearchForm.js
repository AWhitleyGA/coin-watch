import React from 'react'

const SearchForm = (props) => {
  return (
    <form onSubmit={props.onSearchSubmit}>
      <input type="text" placeholder="Enter Coin Symbol..." onChange={props.onSearchInput} />
      <input type="submit" value="Search" />
    </form>
  )
}


export default SearchForm
