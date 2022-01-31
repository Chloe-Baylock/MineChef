import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './HomePage.css'

function HomePage() {

  const history = useHistory();
  const currentUser = useSelector(state => state.session.user)

  return (
    <>
    {currentUser && (
      <Redirect to="/profile" />
    )}
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