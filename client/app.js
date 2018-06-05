import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import { SingleProduct } from './components';


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
