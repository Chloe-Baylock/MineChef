import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import './Profile.css'
import { HeartIcon, UserIcon, ChatIcon } from "@heroicons/react/solid";

function Profile() {

  const dispatch = useDispatch()
  // const [user, setUser] = useState({})
  const [ editPopup, setEditPopup ] = useState("Edit Profile");
  const [ edit, setEdit ] = useState("none");
  // const [ currentUser, setCurrentUser ]
  const currentUser = useSelector(state => state.session.user)


  return (
    <>
      <div className='image-wrapper'>
        {/* <img className='pfp-image' src="https://i.ibb.co/SsYtLQN/minewithahat.png"></img> */}
        {/* <p><HeartIcon className='pfp-image-heart' /></p> */}
      </div>
      <div className="info-container">
        <div className='edit-button-container'>
          <button
            className="edit-info"
            onClick={(e) => {
              if (editPopup === "Edit Profile") {
                setEditPopup("Cancel")
                setEdit('none')
              } 
              else setEditPopup("Edit Profile");
            }}
          >{editPopup}</button>
        </div>
        <div className='popup-div'>
          <EditProfile
            trigger={editPopup}
            setTrigger={setEditPopup}
            edit={edit}
            setEdit={setEdit}
          />
        </div>
        {editPopup !== 'Cancel' && <div className='below-popup'>
          <p><strong>User Id:</strong> {currentUser.id}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>password:</strong> {currentUser.password}</p>
          <p><strong>Profile Picture:</strong> {currentUser.pfp_url || 'none'}</p>
          <p><strong>Description:</strong> {currentUser.description || 'none'}</p>
        </div>}
      </div>
    </>
  )
}
export default Profile;