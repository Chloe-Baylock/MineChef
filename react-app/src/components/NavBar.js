import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LogoutIcon } from "@heroicons/react/solid";
import { logout } from '../store/session';

import './NavBar.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const onLogout = async () => {
    await dispatch(logout());
  };

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
              <p>
                <NavLink className='noDecorate' to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </p>
              <p>
                <NavLink className='noDecorate' to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </p>
            </>
          )}
          {x && (
            <>
              <button className='nav-button-comp'>
                <p>
                  <NavLink className='noDecorate' to='/users' exact={true} activeClassName='active'>
                    Users
                  </NavLink>
                </p>
              </button>
              <button className='nav-button-comp'>
                <p>
                  <NavLink className='noDecorate' to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>
                </p>
              </button>
              <button className='nav-button-comp'>
                <p>
                  <NavLink className='noDecorate' to='/posts' exact={true} activeClassName='active'>
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
