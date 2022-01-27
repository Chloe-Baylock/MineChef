import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user)
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
                  <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                </p>
                <p>
                  <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </p>
              </>
            )}
            {x && (
              <>
                <p>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </p>
                <p>
                  <NavLink to='/profile' exact={true} activeClassName='active'>
                    Profile
                  </NavLink>
                </p>
                <p>
                  <NavLink to='/posts' exact={true} activeClassName='active'>
                    Posts
                  </NavLink>
                </p>

                <p>
                  <LogoutButton />
                </p>
              </>
            )}
          </div>
        </div>
      </nav >
  );
}

export default NavBar;
