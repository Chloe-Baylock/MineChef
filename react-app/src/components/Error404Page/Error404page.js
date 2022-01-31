import React from 'react';
import './Error404Page.css'

function Error404Page() {
  const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';
  return (
    <>
      <h1>
        Error 404, We could not find the page you were looking for.
      </h1>
      <img className='emily-image' src='https://minechef.s3.amazonaws.com/cb039736185348d4a1a8a2a8f016a79e.png' alt='minewithahat'></img>
    </>
  )
}

export default Error404Page