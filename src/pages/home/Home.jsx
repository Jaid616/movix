import React from 'react'
import Hero from './heroBanner/Hero'
import "./style.scss"
import Trending from './trending/Trending'
import Popular from './popular/Popular'
import TopRated from './topRated/TopRated'
Hero
const Home = () => {
  return (
    <div className='homepage'>
      <Hero/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home
