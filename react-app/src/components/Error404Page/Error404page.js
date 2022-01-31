import React from 'react';
import './Error404Page.css'

function Error404Page() {
  return (
    <div className='err-bg-color'>
      <div className='err-404-page'>
        <h1 className='err-h1'>
          Error 404, We could not find the page you were looking for.
        </h1>
        <img className='emily-image' src='https://minechef.s3.amazonaws.com/cb039736185348d4a1a8a2a8f016a79e.png' alt='minewithahat'></img>
      </div>
    </div>
  )
}

export default Error404Page