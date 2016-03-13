import React from 'react'

let className = 'HexagramLine'

export default ({number, lines}) => (
  <div className='Hexagram'>
    {
      [].slice.call(lines).reverse().map((line, i) => {
        return (
          <div key={i} className={`${className} ${className}-${line.toLowerCase()}`} />
        )
      })
    }
  </div>
)
