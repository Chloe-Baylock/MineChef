import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/session';
import EditProfile from './EditProfile';
import './Profile.css'

function Profile() {

  const dispatch = useDispatch()
  // const [user, setUser] = useState({})
  const [ editPopup, setEditPopup ] = useState("Edit");
  // const [ currentUser, setCurrentUser ]
  const currentUser = useSelector(state => state.session.user)


  return (
    <>
      <div className="info-container">
        <div className='edit-button-container'>
          <button
            className="edit-info"
            onClick={(e) => {
              if (editPopup === "Edit") setEditPopup("Cancel")
              else setEditPopup("Edit");
            }}
          >{editPopup}</button>
        </div>
        <div className='popup-div'>
          <EditProfile
            trigger={editPopup}
            setTrigger={setEditPopup}
            // user={user}


          />
        </div>
        <div className='below-popup'>
          <p><strong>User Id:</strong> {currentUser.id}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>password:</strong> {currentUser.password}</p>
          <p><strong>Profile Picture:</strong> {currentUser.pfp_url || 'none'}</p>
          <p><strong>Description:</strong> {currentUser.description || 'none'}</p>
        </div>
      </div>
    </>
  )
}
export default Profile;