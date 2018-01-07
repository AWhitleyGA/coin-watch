import React from 'react'

import './FilteredList.css'

const FilteredList = (props) => {
  let { fullList, filterAttribute, filterValue, displayAttribute, onItemClick } = props

  let filteredItems = fullList.reduce((acc, item, index) => {
    if (item[filterAttribute].includes(filterValue)) {
      acc.push(
        <div
          key={index}
          className="FilteredList__item"
          data-itemvalue={item[filterAttribute]}
          onClick={onItemClick}
        >
          {item[displayAttribute]}
        </div>
      )
    }
    return acc
  }, [])

  return (
    <div className="FilteredList">
      {filteredItems}
    </div>
  )
}


export default FilteredList
