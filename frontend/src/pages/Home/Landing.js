import React from 'react'
import CarouselTop from './Carousel'

const Landing = props => {
  return (
    <div>
      < CarouselTop/>
      <button onClick={props.handleLogout}>Logout</button>
    
    </div>
  )
}

export default Landing
