import React from 'react'


const FilteredList = (props) => {
  let { fullList, filterAttribute, filterValue, displayAttribute } = props

  let filteredItems = fullList.reduce((acc, item, index) => {
    if (item[filterAttribute].includes(filterValue)) {
      acc.push(
        <p key={index}>{item[displayAttribute]}</p>
      )
    }
    return acc
  }, [])

  return (
    <div>
      {filteredItems}
    </div>
  )
}


export default FilteredList
