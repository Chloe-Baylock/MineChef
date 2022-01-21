import React, { useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import './Profile.css'

function Profile() {

  const [user, setUser] = useState({})
  const [editPopup, setEditPopup] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/auth/`);
      const data = await response.json();
      console.log('******* data is', data);
      setUser(data);
    })()
  }, [])


  return (
    <>
      <div className="info-container">
        <div className='edit-button-container'>
          <button
            className="edit-info"
            onClick={(e) => {
              if (!editPopup) e.target.innerText = 'Cancel'
              else e.target.innerText = 'Edit'
              setEditPopup(!editPopup);
            }}
          >Edit</button>
        </div>
        <div className='popup-div'>
          <EditProfile
            trigger={editPopup}
            setTrigger={setEditPopup}
            user={user}      

                           
          />
        </div>
        <p><strong>User Id:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>hashed_password:</strong> ********</p>
        <p><strong>Profile Picture:</strong> {user.pfp_url || 'none'}</p>
        <p><strong>Description:</strong> {user.description || 'none'}</p>
      </div>
    </>
  )
}
export default Profile;