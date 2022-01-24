import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditEmail(props) {
  const dispatch = useDispatch();

  const [ email, setEmail ] = useState(props.currentUser.email)

  const alterEmail = e => {
    e.preventDefault();
    dispatch(editUser({'email': email}));
    props.setTrigger('Edit Profile');
  }

  return (
    <>
      <form onSubmit={alterEmail}>
        <input
        name='email'
        type='email'
        placeholder='Email'
        value={email || ''}
        onChange={e => setEmail(e.target.value)}
        ></input>
        <button>Submit</button>

      </form>
    </>
  )
}

export default EditEmail;



