import {divine} from '../divine'
import React from 'react'
import Input from './input'
import Hexagram from './hexagram'

export default React.createClass({
  getInitialState () {
    return {
      hexagrams: []
    }
  },
  render () {
    return (
      <div className='DiviningTable'>
        <Input handleSubmit={this.handleSubmit} />
        <div className='HexagramContainer'>
          {
            this.state.hexagrams.map(({lines, number}) => {
              return <Hexagram key={number} lines={lines} number={number} />
            })
          }
        </div>
      </div>
    )
  },
  handleSubmit (e) {
    if (e.keyCode === 13 && e.target.value) {
      this.setState({
        hexagrams: divine(e.target.value)
      })
    }
  }
})
