import React from 'react'

export default (props) => (
  <div className='InputContainer'>
    <input className='InputContainer-Input' placeholder='Posit a question to the universe...' onKeyDown={props.handleSubmit} />
  </div>
)
