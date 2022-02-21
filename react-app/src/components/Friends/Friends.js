import React from 'react';
import { useSelector } from 'react-redux';
import './Friends.css'

function Friends() {

  // const friends = useSelector(state => state.friendsReducer)

  return (
    <p className='friend-position'>
      Friends: {}
    </p>
  )
}

export default Friends;