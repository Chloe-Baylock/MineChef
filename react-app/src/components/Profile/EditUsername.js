import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditUsername(props) {
  const dispatch = useDispatch();

  const [ trigger, setTrigger ] = useState(props.trigger)
  const [ username, setUsername ] = useState(props.currentUser.username)

  const alterUsername = e => {
    e.preventDefault();
    dispatch(editUser({'username': username}))
  }

  return (
    <>
      <form onSubmit={alterUsername}>
        <input
        name='username'
        type='text'
        placeholder='Username'
        value={username || ''}
        onChange={e => setUsername(e.target.value)}
        ></input>
        <button onClick={() => props.setTrigger('Edit Profile')}>Submit</button>
      </form>
    </>
  )
}

export default EditUsername;