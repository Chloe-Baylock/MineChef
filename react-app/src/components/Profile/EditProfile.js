import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editUser} from '../../store/session'
import './Profile.css'


function EditProfile(props) {

  const dispatch = useDispatch()

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ hashed_password, setHashed_password ] = useState('')
  const [ pfp_url, setPfp_url ] = useState('')
  const [ description, setDescription ] = useState('')

  useEffect(() => {
    setUsername(props.user.username);
    setEmail(props.user.email);
    setHashed_password(props.user.hashed_password);
    if (props.user.pfp_url) setPfp_url(props.user.pfp_url);
    if (props.user.description) setDescription(props.user.description);
  }, [props.user])

  const handleEdit = (e) => {
    e.preventDefault();
    console.log('handleEdit')
    dispatch(editUser(username, email, hashed_password, description, pfp_url))
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
              value={username}
              onChange={e => setUsername(e.target.value)}
            ></input>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={hashed_password}
              onChange={e => setHashed_password(e.target.value)}
            ></input>
            <input
              name='profilePicture'
              type='text'
              placeholder='ProfilePicture'
              value={pfp_url}
              onChange={e => setPfp_url(e.target.value)}
            ></input>
            <input
              name='description'
              type='text'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></input>
          </div>
        </div>
        <button
          className="submit-edit"
        >Submit</button>
      </form>
    </>
  ) : (
    ""
  )
}
export default EditProfile;