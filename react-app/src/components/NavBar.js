
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const minewithahat = 'https://i.ibb.co/SsYtLQN/minewithahat.png';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <p>
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={minewithahat} alt='minewithahat'></img>
          </NavLink>
        </p>
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
        <p>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </p>
        <p>
          <LogoutButton />
        </p>
      </ul>
    </nav>
  );
}

export default NavBar;
