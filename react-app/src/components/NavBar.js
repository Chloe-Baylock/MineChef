import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { LogoutIcon } from "@heroicons/react/solid";
import { login, logout } from '../store/session';

import './NavBar.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const NavBar = () => {
  const dispatch = useDispatch()
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user)


  const onLogout = async () => {
    await dispatch(logout());
  };

  const onDemo = async () => {
    const dUsername = 'Demo'
    const dPassword = 'password'

    dispatch(login(dUsername, dPassword))
  }

  let x = false;
  if (currentUser) x = true

  return (
    <nav className='topmost'>
      <div className='outer-nav'>
        <div className='nav-left-side'>
          <p className='one'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img className='minewithahat' src={minewithahat} alt='minewithahat'></img>
            </NavLink>
          </p>
          <p className='MineChef'>
            MineChef
          </p>
        </div>
        <div className='nav-right-side'>
          {x || (
            <>
            <button className='nav-button-comp' onClick={() => onDemo()}>
                <p>
                  Demo
                </p>
              </button>
              <button
                className='nav-button-comp'
                onClick={() => document.getElementById('slash-login').click()}
              >
                <p>
                  <NavLink id='slash-login' className='noDecorate' to='/login' exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                </p>
              </button>
              <button
                className='nav-button-comp'
                onClick={() => document.getElementById('slash-sign-up').click()}
              >
                <p>
                  <NavLink id='slash-sign-up' className='noDecorate' to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </p>
              </button>
            </>
          )}
          {x && (
            <>
              <button
                className='nav-button-comp'
                onClick={() => document.getElementById('slash-users').click()}
              >
                <p>
                  <NavLink id='slash-users' className='noDecorate' to='/users' exact={true} activeClassName='active'>
                    Users
                  </NavLink>
                </p>
              </button>
              <button
                className='nav-button-comp'
                onClick={() => document.getElementById('slash-profile').click()}
              >
                <p>
                  <NavLink id='slash-profile' className='noDecorate' to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>
                </p>
              </button>
              <button
                className='nav-button-comp'
                onClick={() => document.getElementById('slash-posts').click()}
              >
                <p>
                  <NavLink id='slash-posts' className='noDecorate' to='/posts' exact={true} activeClassName='active'>
                    Posts
                  </NavLink>
                </p>
              </button>
              <button className='nav-button-comp' onClick={() => onLogout()}>
                <p className='move-up-pls'>
                  {currentUser.username} <LogoutIcon className='logout-icon' />
                </p>
              </button>
            </>
          )}
        </div>
      </div>
    </nav >
  );
}

export default NavBar;
