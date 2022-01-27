import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditUsername(props) {
  const dispatch = useDispatch();

  const [ username, setUsername ] = useState(props.currentUser.username)

  const alterUsername = e => {
    e.preventDefault();
    dispatch(editUser({'username': username}));
    props.setTrigger('Edit Profile');
    props.setFlicker(!props.flicker);
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
        <button>Submit</button>
      </form>
    </>
  )
}

export default EditUsername;