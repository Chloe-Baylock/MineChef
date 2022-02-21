import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronUpIcon } from "@heroicons/react/solid";
import './Friends.css'

function Friends(props) {

  // const friends = useSelector(state => state.friendsReducer)

  return (
    <p className='friends-position'>
      Friends:
      {' ' + props.friends.true_friends?.length + ' '}
      <ChevronUpIcon className='friends-chevron-up-icon'/>
    </p>
  )
}

export default Friends;