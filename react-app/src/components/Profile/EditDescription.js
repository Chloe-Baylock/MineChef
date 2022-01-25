import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditDescription(props) {
  const dispatch = useDispatch();

  const [ description, setDescription ] = useState(props.currentUser.description)

  const alterDescription = e => {
    e.preventDefault();
    dispatch(editUser({'description': description}));
    props.setEditDesc('Edit')
  }

  return (
    <>
      <form onSubmit={alterDescription}>
        <input
        name='description'
        type='textarea'
        placeholder='Description'
        value={description || ''}
        onChange={e => setDescription(e.target.value)}
        ></input>
        <button>Submit</button>
      </form>
    </>
  )
}

export default EditDescription;



