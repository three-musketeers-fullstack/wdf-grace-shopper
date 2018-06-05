import React from 'react'

import {Navbar, SingleProduct } from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <SingleProduct />
    </div>
  )
}

export default App
