import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { editUser, destroyUser } from '../../store/session';
import EditUsername from './EditUsername';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import './Profile.css';


function EditProfile(props) {

  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pfp_url, setPfp_url] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setUsername(currentUser.username);
    setEmail(currentUser.email);
    setPassword(currentUser.password);
    if (currentUser.pfp_url) setPfp_url(currentUser.pfp_url);
    if (currentUser.description) setDescription(currentUser.description);
  }, [])

  const editTypeButton = (e, classA) => {
    if (props.edit === classA) {
      props.setEdit('none')
      e.target.style.backgroundColor=''
    } else {
      props.setEdit(classA)
      const etb = document.getElementsByClassName('edit-type-button')
      Array.from(etb).forEach(ele => ele.style.backgroundColor='')
      e.target.style.backgroundColor='red'
    } 
  }

  const handleDelete = () => {
    console.log('handle delete');
    dispatch(destroyUser(currentUser));
    dispatch(logout());
    history.push('/deleted');
  }

  return props.trigger === "Cancel" ? (
    <div className='editing-grid'>
      <div className='edit-buttons-div'>
        <button
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'username')}
        >Change Username </button>
        <button
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'email')}
        >Change Email </button>
        <button
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'password')}
        >Change Password </button>
        <button
          className='delete-account'
          onClick={() => handleDelete()}
        >Delete Account </button>
      </div>
      <div>
        {props.edit === 'username' && <EditUsername
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
        {props.edit === 'email' && <EditEmail
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
        {props.edit === 'password' && <EditPassword 
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
      </div>
    </div>
  ) : (
    ""
  )
}
export default EditProfile;