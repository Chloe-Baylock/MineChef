import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import { destroyUser } from '../../store/session';
import EditUsername from './EditUsername';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import './EditProfile.css';


function EditProfile(props) {

  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const editTypeButton = (e, classA) => {
    if (props.edit === classA) {
      props.setEdit('none')
      e.target.style.backgroundColor = ''
    } else {
      props.setEdit(classA)
      const etb = document.getElementsByClassName('edit-type-button')
      Array.from(etb).forEach(ele => ele.style.backgroundColor = '')
      e.target.style.backgroundColor = 'lime'
    }
  }

  const handleDelete = () => {
    console.log('handle delete');
    dispatch(destroyUser(currentUser));
    dispatch(logout());
    history.push('/deleted');
  }

  return props.trigger === "Cancel" ? (
    <div
      className='deselect'
      onClick={e => e.target.className === 'deselect' && props.setTrigger("Edit Profile")}
    >
      <div className="modal-grid">

        <button
          id="button1"
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'username')}
        >Change Username </button>
        <button
          id="button2"
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'email')}
        >Change Email </button>
        <button
          id="button3"
          className='edit-type-button'
          onClick={e => editTypeButton(e, 'password')}
        >Change Password </button>
        <button
          id='delete-account'
          className='edit-type-button'
          onClick={() => handleDelete()}
        >Delete Account </button>

        {props.edit === 'none' && (
          <>
            <p className='current-username'>{currentUser.username}</p>
            <p className='current-email'>{currentUser.email}</p>
          </>
        )}
        <div className='edit-username'>
          {props.edit === 'username' && <EditUsername
            setTrigger={props.setTrigger}
            currentUser={currentUser}
          />}
        </div>
        <div className='edit-email'>
          {props.edit === 'email' && <EditEmail
            setTrigger={props.setTrigger}
            currentUser={currentUser}
          />}
        </div>
        <div className='edit-password'>
          {props.edit === 'password' && <EditPassword
            setTrigger={props.setTrigger}
            currentUser={currentUser}
          />}
        </div>
      </div>
      <div className='gray-div'>

      </div>
    </div>
  ) : (
    ""
  )
}
export default EditProfile;