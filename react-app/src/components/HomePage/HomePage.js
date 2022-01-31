import React from 'react';
import { useHistory } from 'react-router-dom';
import './HomePage.css'

function HomePage() {
  const history = useHistory();

  return (
    <>
      <div className='home-page-fill'>
        <div className='home-flex-div'>
          <button
            className='home-button-comp'
            onClick={() => history.push('/login')}
          >
            <p>
              Login
            </p>
          </button>
          <button
            className='home-button-comp'
            onClick={() => history.push('/sign-up')}
          >
            <p>
              Sign Up
            </p>
          </button>
        </div>
      </div>
    </>
  )
}

export default HomePage;