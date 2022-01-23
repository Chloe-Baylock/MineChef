import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditPassword(props) {
  const dispatch = useDispatch();

  const [ password, setPassword ] = useState('')

  const alterpassword = e => {
    e.preventDefault();
    dispatch(editUser({'password': password}));
    props.setTrigger('Edit Profile');
  }

  return (
    <>
      <form onSubmit={alterpassword}>
        <input
        name='password'
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </>
  )
}

export default EditPassword;