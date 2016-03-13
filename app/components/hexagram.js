import React from 'react'
import {HEXAGRAMS} from '../constants'

let className = 'HexagramLine'

export default ({number, lines}) => (
  <div className='Hexagram'>
    <div className='HexagramTitle'>
      Hexagram {number}
    </div>
    {
      [].slice.call(lines).reverse().map((line, i) => {
        return (
          <div key={i} className={`${className} ${className}-${line ? 'yang' : 'yin'}`} />
        )
      })
    }
  </div>
)
