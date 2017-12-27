import React, { Component } from 'react'

import SearchForm from '../components/SearchForm'

class SearchView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchSymbol: null
    }
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchInput (e) {
    this.setState({
      searchSymbol: e.target.value
    })
  }

  handleSearchSubmit (e) {
    e.preventDefault()
    console.log(`Searching for ${this.state.searchSymbol}`)
  }

  render () {
    return (
      <div>
        <h1>Search</h1>
        <SearchForm
          onSearchInput={this.handleSearchInput}
          onSearchSubmit={this.handleSearchSubmit}
        />
      </div>
    )
  }
}


export default SearchView
