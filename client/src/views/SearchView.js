import React, { Component } from 'react'
import axios from 'axios'

import SearchForm from '../components/SearchForm'
import FilteredList from '../components/FilteredList'

import './SearchView.css'

class SearchView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchSymbol: null,
      symbolOptions: []
    }
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  componentDidMount () {
    axios.get('/api/prices')
      .then((response) => {
        console.log(response.data)
        this.setState({
          symbolOptions: response.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
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
      <div className="SearchView">
        <h1>Search</h1>
        <SearchForm
          onSearchInput={this.handleSearchInput}
          onSearchSubmit={this.handleSearchSubmit}
        />
        {
          this.state.symbolOptions[0] &&
          this.state.searchSymbol &&
          <FilteredList
            fullList={this.state.symbolOptions}
            filterAttribute='symbol'
            filterValue={this.state.searchSymbol}
            displayAttribute='symbol'
          />
        }
      </div>
    )
  }
}


export default SearchView
