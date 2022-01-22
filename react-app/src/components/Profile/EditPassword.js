import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditPassword(props) {
  const dispatch = useDispatch();

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
        <button>Submit</button>
      </form>
    </>
  )
}

export default EditPassword;