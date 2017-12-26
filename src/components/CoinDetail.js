import React from 'react'


const CoinDetail = (props) => {
  return (    
    <div>
    <h2>{props.coin.symbol}</h2>
    <p>{props.coin.currentSellPrice}</p>
    </div>
  )
}


export default CoinDetail
