import React from 'react';
import { createStoreHook } from 'react-redux';
// import './cook.png'

function HomePage() {


  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/cook.png`} />
    </div>
  )
}

export default HomePage;