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

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   props.setTrigger("Edit");
  //   dispatch(editUser(username, email, password, description, pfp_url));
  // }

  const handleDelete = e => {
    e.preventDefault();
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
      </div>
      <div>
        {props.edit === 'username' && <EditUsername
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
        {props.edit === 'email' && <EditEmail
          etrigger={props.trigger}
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
        {props.edit === 'password' && <EditPassword 
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          currentUser={currentUser}
        />}
      </div>
    </div>
  ) : (
    ""
  )

  // return props.trigger === "Cancel" ? (
  //   <>
  //     <form onSubmit={handleEdit}>
  //       <div className='popup-form-grid'>
  //         <div className='popup-labels'>
  //           <label htmlFor='username'>Username: </label>
  //           <label htmlFor='email'>Email: </label>
  //           <label htmlFor='password'>Password: </label>
  //           <label htmlFor='profilePicture'>Profile Picture: </label>
  //           <label htmlFor='description'>Description: </label>
  //         </div>
  //         <div className='popup-inputs'>
  //           <input
  //             name='username'
  //             type='text'
  //             placeholder='Username'
  //             value={username || ''}
  //             onChange={e => setUsername(e.target.value)}
  //           ></input>
  //           <input
  //             name='email'
  //             type='text'
  //             placeholder='Email'
  //             value={email || ''}
  //             onChange={e => setEmail(e.target.value)}
  //           ></input>
  //           <input
  //             name='password'
  //             type='password'
  //             placeholder='Password'
  //             value={password || ''}
  //             onChange={e => setPassword(e.target.value)}
  //           ></input>
  //           <input
  //             name='profilePicture'
  //             type='text'
  //             placeholder='ProfilePicture'
  //             value={pfp_url || ''}
  //             onChange={e => setPfp_url(e.target.value)}
  //           ></input>
  //           <input
  //             name='description'
  //             type='text'
  //             placeholder='Description'
  //             value={description || ''}
  //             onChange={e => setDescription(e.target.value)}
  //           ></input>
  //         </div>
  //       </div>
  //       <button
  //         className="submit-edit"
  //       >Submit</button>
  //     </form>
  //     <button
  //       className='delete-account'
  //       onClick={handleDelete}
  //     >
  //       Delete Account
  //     </button>
  //   </>
  // ) : (
  //   ""
  // )
}
export default EditProfile;