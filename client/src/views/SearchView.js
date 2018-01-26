import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { fetchPrices } from '../actions/prices'
import { updateSearchSymbol, selectSymbol } from '../actions/search'

import './SearchView.css'

import SearchForm from '../components/SearchForm'
import FilteredList from '../components/FilteredList'
import CoinDetail from '../components/CoinDetail'



class SearchView extends Component {
  constructor (props) {
    super(props)
    this.addTicker = this.addTicker.bind(this)
  }

  componentDidMount () {
    if (!this.props.auth.user) {
      this.props.history.push('/login', {
        previousLocation: this.props.location.pathName
      })
    } else {
      this.props.fetchPrices()
    }
  }

  addTicker () {
    axios({
      method: 'post',
      url: '/api/tickers',
      headers: {
        Authorization: localStorage.getItem('CoinWatchToken')
      },
      data: {
        symbol: this.props.search.searchSymbol
      }
    })
    .then((response) => {
      this.props.history.push(`/dashboard/${response.data.symbol}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div className="SearchView">
        <SearchForm
          value={this.props.search.searchSymbol}
          onSearchInput={this.props.handleSearchInput}
          label="Ticker Search"
          placeholder="Enter Coin Symbol..."
        />
        {
          this.props.search.searchSymbol &&
          !this.props.search.symbolSelected &&
          <FilteredList
            fullList={this.props.prices}
            filterAttribute='symbol'
            filterValue={this.props.search.searchSymbol}
            displayAttribute='symbol'
            onItemClick={this.props.handleSymbolSelect}
          />
        }
        {
          this.props.search.searchSymbol &&
          this.props.search.symbolSelected &&
          <div>
            <CoinDetail
              coin={{ symbol: this.props.search.searchSymbol }}
            />
            <button onClick={this.addTicker}>Add Ticker to Dashboard</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    prices: state.prices,
    search: state.search,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPrices: () => {
      dispatch(fetchPrices())
    },
    handleSearchInput: (e) => {
      dispatch(updateSearchSymbol(e.target.value))
    },
    handleSymbolSelect: (e) => {
      dispatch(selectSymbol(e.target.dataset.itemvalue))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
