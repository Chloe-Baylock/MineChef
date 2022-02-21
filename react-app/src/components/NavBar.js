import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { LogoutIcon } from "@heroicons/react/solid";
import { logout } from '../store/session';

import './NavBar.css'

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currentUser = useSelector(state => state.session.user);


  const onLogout = async () => {
    await dispatch(logout());
    history.push('/')
  };

  let x = false;
  if (currentUser) x = true

  return (
    <nav className='topmost'>
      <div className='outer-nav'>
        <div className='nav-left-side'>
          <p className='one'>
            <img className='minewithahat' src={minewithahat} alt='minewithahat'></img>
          </p>
          <p className='MineChef'>
            MineChef
          </p>
        </div>
        <div className='nav-right-side'>
          <a href='https://github.com/Chloe-Baylock'>
            <img
              className='nav-github-icon'
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            ></img>
          </a>
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
                onClick={() => document.getElementById('slash-posts').click()}
              >
                <p>
                  <NavLink id='slash-posts' className='noDecorate' to='/posts' exact={true} activeClassName='active'>
                    Posts
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
