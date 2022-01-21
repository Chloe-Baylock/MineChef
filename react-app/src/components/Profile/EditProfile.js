import React from 'react';
import { useDispatch } from 'react-redux';
import { editUser} from '../../store/session'
import './Profile.css'


function EditProfile(props) {

  const dispatch = useDispatch()


  const handleEdit = (e) => {
    e.preventDefault();
    console.log('handleEdit')
    dispatch(editUser(props.username, props.email, props.password, props.description, props.pfp_url))
  }



  return props.trigger ? (
    <>
      <form onSubmit={handleEdit}>
        <div className='popup-form-grid'>
          <div className='popup-labels'>
            <label htmlFor='username'>Username: </label>
            <label htmlFor='email'>Email: </label>
            <label htmlFor='password'>Password: </label>
            <label htmlFor='profilePicture'>Profile Picture: </label>
            <label htmlFor='description'>Description: </label>
          </div>
          <div className='popup-inputs'>
            <input
              name='username'
              type='text'
              placeholder='Username'
              defaultValue={props.user.username}
              onChange={e => e.target.value}
            ></input>
            <input
              name='email'
              type='text'
              placeholder='Email'
              defaultValue={props.user.email}
              onChange={e => e.target.value}
            ></input>
            <input
              name='password'
              type='text'
              placeholder='Password'
              defaultValue='*******'
              onChange={e => e.target.value}
            ></input>
            <input
              name='profilePicture'
              type='text'
              placeholder='ProfilePicture'
              defaultValue={props.user.pfp_url}
              onChange={e => e.target.value}
            ></input>
            <input
              name='description'
              type='text'
              placeholder='Description'
              defaultValue={props.user.description}
              onChange={e => e.target.value}
            ></input>
          </div>
        </div>
        <button
          className="submit-edit"
          type='submit'
        >Submit</button>
      </form>
    </>
  ) : (
    ""
  )
}
export default EditProfile;