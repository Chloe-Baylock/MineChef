import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser } from '../../store/session'

function EditDescription(props) {
  const dispatch = useDispatch();

  const [description, setDescription] = useState(props.owner.description)

  const alterDescription = async e => {
    e.preventDefault();
    await dispatch(editUser({ 'description': description }));
    props.setEditDesc('Edit');
    props.setFlicker(!props.flicker);
  }

  return (
    <>
      <form onSubmit={alterDescription}>
        <textarea
          className='profile-alter-description'
          name='description'
          placeholder='Description'
          value={description || ''}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <button className='profile-button-comp'>Submit</button>
      </form>
    </>
  )
}

export default EditDescription;



