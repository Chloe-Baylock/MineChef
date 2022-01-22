import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditEmail(props) {
  const dispatch = useDispatch();

  const [ trigger, setTrigger ] = useState(props.trigger)
  const [ email, setEmail ] = useState(props.currentUser.email)

  const alterEmail = e => {
    e.preventDefault();
    dispatch(editUser({'email': email}))
  }

  return (
    <>
      <form onSubmit={alterEmail}>
        <input
        name='email'
        type='email'
        placeholder='email'
        value={email || ''}
        onChange={e => setEmail(e.target.value)}
        ></input>
        <button onClick={() => props.setTrigger('Edit Profile')}>Submit</button>

      </form>
    </>
  )
}

export default EditEmail;