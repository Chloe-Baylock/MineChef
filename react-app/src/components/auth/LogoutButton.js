import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { ChevronDownIcon } from '@heroicons/react/solid';
import '../NavBar.css'

const LogoutButton = () => {

  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const onLogout = async () => {
    await dispatch(logout());
  };

  return (
    <button
      onClick={() => onLogout()}
    >{currentUser.username} <ChevronDownIcon className="chevron-down-icon" />
    </button>
  )
};

export default LogoutButton;
