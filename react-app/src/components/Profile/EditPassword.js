import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditPassword(props) {
  const dispatch = useDispatch();

  const [ trigger, setTrigger ] = useState(props.trigger)
  const [ password, setPassword ] = useState(props.currentUser.password)

  const alterpassword = e => {
    e.preventDefault();
    dispatch(editUser({'password': password}))
  }

  return (
    <>
      <form onSubmit={alterpassword}>
        <input
        name='password'
        type='password'
        placeholder='password'
        value={password || ''}
        onChange={e => setPassword(e.target.value)}
        ></input>
        <button onClick={() => props.setTrigger('Edit Profile')}>Submit</button>
      </form>
    </>
  )
}

export default EditPassword;