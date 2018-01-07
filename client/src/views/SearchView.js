import React, { Component } from 'react'
import axios from 'axios'

import SearchForm from '../components/SearchForm'
import FilteredList from '../components/FilteredList'
import CoinDetail from '../components/CoinDetail'

import './SearchView.css'

class SearchView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchSymbol: '',
      symbolSelected: false,
      symbolOptions: []
    }
    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSymbolSelect = this.handleSymbolSelect.bind(this)
    this.addTicker = this.addTicker.bind(this)
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
      searchSymbol: e.target.value,
      symbolSelected: false
    })
  }

  handleSymbolSelect (e) {
    console.log(e.target.dataset.itemvalue)
    this.setState({
      searchSymbol: e.target.dataset.itemvalue,
      symbolSelected: true,
    }, () => {
      console.log(this.state)
    })
  }

  addTicker () {
    // Add axios POST to back-end to add symbol
    this.props.history.push(`/dashboard/${this.state.searchSymbol}`)
  }

  render () {
    return (
      <div className="SearchView">
        <SearchForm
          value={this.state.searchSymbol}
          onSearchInput={this.handleSearchInput}
          label="Ticker Search"
          placeholder="Enter Coin Symbol..."
        />
        {
          this.state.searchSymbol &&
          !this.state.symbolSelected &&
          <FilteredList
            fullList={this.state.symbolOptions}
            filterAttribute='symbol'
            filterValue={this.state.searchSymbol}
            displayAttribute='symbol'
            onItemClick={this.handleSymbolSelect}
          />
        }
        {
          this.state.searchSymbol &&
          this.state.symbolSelected &&
          <div>
            <CoinDetail
              coin={{ symbol: this.state.searchSymbol }}
            />
            <button onClick={this.addTicker}>Add Ticker to Dashboard</button>
          </div>
        }
      </div>
    )
  }
}


export default SearchView
